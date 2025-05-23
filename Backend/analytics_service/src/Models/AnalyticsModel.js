const mongoose = require('mongoose');


// MongoDB Analytics schema: one document only, updated every time
const analyticsSchema = new mongoose.Schema({
    _id: { type: String, default: 'main' }, // so we always update the same doc
    totalApplications: { type: Number, default: 0 },
    totalInterviews:   { type: Number, default: 0 },
    lastApplicationIds: { type: [String], default: [] }, // keep last 2
    lastInterviewIds: { type: [String], default: [] },   // keep last 2
    applicationStatusCounts: { 
        type: Map,     // for flexible status keys
        of: Number,
        default: {} 
    },
    updatedAt: { type: Date, default: Date.now }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;