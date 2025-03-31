const Job = require("../models/jobModel");


// exports.createJob = async (req, res) => {
//   try {
//     const newJob = new Job({ ...req.body, createdBy: req.user.id });
//     await newJob.save();
//     res.status(201).json(newJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.updateJob = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     if (job.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// exports.deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     if (job.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     await job.deleteOne();
//     res.status(200).json({ message: "Job deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.createJob = async (req, res) => {
  try {
    console.log("Received Job Data:", req.body);
    const newJob = new Job({ ...req.body, createdBy: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: error.message });
  }
};




exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};