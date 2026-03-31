const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');
  res.status(200).json({ jobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    return res.status(404).json({ msg: `No job with id ${jobId}` });
  }

  res.status(200).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    return res.status(404).json({ msg: `No job with id ${jobId}` });
  }

  res.status(200).json({ msg: "Success" });
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};