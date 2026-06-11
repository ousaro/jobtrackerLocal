const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  company_name: { type: String, required: true },
  position_title: { type: String, required: true },
  application_date: { type: Date, required: true },
  location: { type: String, required: true },
  salary_expectation: { type: Number, required: true },
  status: {
    type: String,
    enum: ['SAVED', 'APPLIED', 'INTERVIEW_SCHEDULED', 'OFFER_RECEIVED', 'REJECTED', 'HIRED'],
    default: 'SAVED',
    required: true
  },
  job_description_link: { type: String, required: true },
}, {
  collection: 'job_applications',
  timestamps: { createdAt: 'created_at', updatedAt: 'last_modified' }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
