const Analytics = require('../Models/AnalyticsModel');

async function updateAnalytics({ 
    applicationId, 
    interviewId, 
    status,            // current status string, e.g., 'APPLIED'
    previousStatus,    // only for updates, may be undefined/null 
},isCreated) {
    const analytics = await Analytics.findById('main') || new Analytics({ _id: 'main' });

    if (applicationId) {
        console.log('isCreated:', isCreated);
        if (isCreated) analytics.totalApplications++;
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
                    : {}  // Ensure plain JS object for Map
            }
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return {
            totalApplications: 0,
            totalInterviews: 0,
            lastApplicationIds: [],
            lastInterviewIds: [],
            applicationStatusCounts: {}
        };
    }

    
}


const getAnalyticsDataSummary = async (req,res) => {
    try{
        const analytics = await Analytics.findById('main').lean();
        if (analytics) {
            res.status(200).json(analytics);
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Error fetching analytics' });
    }

    
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