const JobApplication = require('../Models/JobApplication');
const { publishEvent, publishToAppQueue } = require('../Config/publisher');

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({});
    if (applications.length === 0) {
      return res.status(200).json([]);
    }
    res.json(applications);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

const getApplication = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Application ID is required" });
  }
  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

const createApplication = async (req, res) => {
  const { owner_id, company_name, position_title, application_date, location, salary_expectation, status, job_description_link } = req.body;

  if (!owner_id || !company_name || !position_title || !application_date || !location || salary_expectation === undefined || !job_description_link) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    const application = new JobApplication({
      owner_id,
      company_name,
      position_title,
      application_date,
      location,
      salary_expectation,
      status: status || 'SAVED',
      job_description_link
    });

    const saved = await application.save();

    await publishEvent(
      process.env.RABBITMQ_ROUTING_KEY_APPLICATION_CREATED || 'application.created',
      saved.toObject()
    );

    const indexData = {
      id: saved._id,
      position_title: saved.position_title,
      company_name: saved.company_name,
      status: saved.status,
      location: saved.location,
    };
    await publishToAppQueue({ action: "create", data: indexData });

    res.status(201).json(saved);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Application ID is required" });
  }

  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const previousStatus = application.status;

    const allowedFields = ['owner_id', 'company_name', 'position_title', 'application_date', 'location', 'salary_expectation', 'status', 'job_description_link'];
    const updates = {};
    allowedFields.forEach(field => {
      if (field in req.body) {
        updates[field] = req.body[field];
      }
    });

    const updated = await JobApplication.findByIdAndUpdate(id, { $set: updates }, { new: true });

    const eventPayload = updated.toObject();
    eventPayload.previousStatus = previousStatus;
    await publishEvent(
      process.env.RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED || 'application.updated',
      eventPayload
    );

    const indexData = {
      id: updated._id,
      position_title: updated.position_title,
      company_name: updated.company_name,
      status: updated.status,
      location: updated.location,
    };
    await publishToAppQueue({ action: "create", data: indexData });

    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Application ID is required" });
  }

  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await JobApplication.deleteOne({ _id: id });

    const indexData = { id };
    await publishToAppQueue({ action: "delete", data: indexData });

    res.json({ message: "Application deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

const getApplicationsByIds = async (req, res) => {
  const ids = Array.isArray(req.body) ? req.body : [];

  if (ids.length === 0) {
    return res.status(400).json({ message: "IDs must be a non-empty array" });
  }

  try {
    const applications = await JobApplication.find({ _id: { $in: ids } });
    res.json(applications);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByIds,
};
