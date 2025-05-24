const Analytics = require('../Models/AnalyticsModel');
const { getApplicationsByIds, getInterviewsByIds } = require('../Config/getServices');

async function updateAnalytics({ 
    applicationId, 
    interviewId, 
    status,            // current status string, e.g., 'APPLIED'
    previousStatus,    // only for updates, may be undefined/null 
},isCreated) {
    const analytics = await Analytics.findById('main') || new Analytics({ _id: 'main' });

    if (applicationId) {
        if (isCreated) {
            analytics.totalApplications++;

            // MONTHLY: get key and increment counter
            const now = new Date();
            const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            let currentMonthValue = analytics.monthlyApplications.get(monthKey) || 0;
            analytics.monthlyApplications.set(monthKey, currentMonthValue + 1);
        }
        analytics.lastApplicationIds = pushUniqueId(analytics.lastApplicationIds || [], applicationId);

        // Increment the new/current status count
        if (status) {
            let count = analytics.applicationStatusCounts.get(status) || 0;
            analytics.applicationStatusCounts.set(status, count + 1);
        }
        // On update: Decrement the previous status
        if (!isCreated && previousStatus && previousStatus !== status) {
            let prevCount = analytics.applicationStatusCounts.get(previousStatus) || 0;
            analytics.applicationStatusCounts.set(previousStatus, Math.max(0, prevCount - 1));
        }
    }
    if (interviewId) {
        if (isCreated) analytics.totalInterviews++;
        analytics.lastInterviewIds = pushUniqueId(analytics.lastInterviewIds || [], interviewId);
    }

    analytics.updatedAt = new Date();
    await analytics.save();
}


const getAnalyticsSummary = async () => {
    try{
        const analytics = await Analytics.findById('main').lean();
        if (analytics) {
            return{
                totalApplications: analytics.totalApplications,
                totalInterviews: analytics.totalInterviews,
                lastApplicationIds: analytics.lastApplicationIds || [],
                lastInterviewIds: analytics.lastInterviewIds || [],
                applicationStatusCounts: analytics.applicationStatusCounts
                    ? (analytics.applicationStatusCounts instanceof Map
                        ? Object.fromEntries(analytics.applicationStatusCounts)
                        : analytics.applicationStatusCounts)
                    : {},
                monthlyApplications: analytics.monthlyApplications
                    ? (analytics.monthlyApplications instanceof Map
                        ? Object.fromEntries(analytics.monthlyApplications)
                        : analytics.monthlyApplications)
                    : {}
            }
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return {
            totalApplications: 0,
            totalInterviews: 0,
            lastApplicationIds: [],
            lastInterviewIds: [],
            applicationStatusCounts: {},
            monthlyApplications: {}
        };
    }

    
}


const getAnalyticsDataSummary = async (req,res) => {
    try{
        const analytics = await Analytics.findById('main').lean();
        if (!analytics) return res.status(404).json({ error: 'Analytics data not found' });

        // get the last 2 application and interview 
        const lastApplications = await getApplications(analytics.lastApplicationIds || []);
        const lastInterviews = await getInterviews(analytics.lastInterviewIds || []);
        const summary = {...analytics, lastApplications, lastInterviews};
        delete summary._id; // Remove _id for cleaner response
        delete summary.__v; // Remove __v for cleaner response
        delete summary.updatedAt; // Remove updatedAt for cleaner response

        res.status(200).json(summary);

    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Error fetching analytics' });
    }

    
}

const getApplications = async (ids) => {
    if (!ids || ids.length === 0) return []
    return await getApplicationsByIds(ids);
}

const getInterviews = async (ids) => {
    if (!ids || ids.length === 0) return [];
    return await getInterviewsByIds(ids);
}


const pushUniqueId = (arr, id) => {
    if (!id) return arr;
    const filtered = arr.filter(existingId => existingId !== id);
    filtered.push(id);
    return filtered.slice(-2);
}

module.exports = {
    updateAnalytics,
    getAnalyticsSummary,
    getAnalyticsDataSummary
}