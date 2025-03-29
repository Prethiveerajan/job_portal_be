// const Job = require("../models/jobModel");

// // Create Job
// exports.createJob = async (req, res) => {
//   try {
//     const newJob = new Job(req.body);
//     await newJob.save();
//     res.status(201).json(newJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get All Jobs
// exports.getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Job by ID
// exports.getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });
//     res.status(200).json(job);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Job
// exports.updateJob = async (req, res) => {
//   try {
//     const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete Job
// exports.deleteJob = async (req, res) => {
//   try {
//     await Job.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Job deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Search Jobs (By Title, Company, Location)
// exports.searchJobs = async (req, res) => {
//   try {
//     const { query } = req.query;
//     const jobs = await Job.find({
//       $or: [
//         { jobTitle: new RegExp(query, "i") },
//         { companyName: new RegExp(query, "i") },
//         { location: new RegExp(query, "i") },
//       ],
//     });
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const Job = require("../models/jobModel");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Jobs (By Title, Company, Location)
exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await Job.find({
      $or: [
        { jobTitle: new RegExp(query, "i") },
        { companyName: new RegExp(query, "i") },
        { location: new RegExp(query, "i") },
      ],
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
