
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  applicationDeadline: { type: Date, required: true },
  jobDescription: { type: String, required: true },
  logo: { type: String, default: "" },
  postedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link job to user
});

module.exports = mongoose.model("Job", JobSchema);
