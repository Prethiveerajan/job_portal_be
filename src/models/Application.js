const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     education: { type: String, required: true },
//     degree: { type: String, required: true },
//     resume: { type: String, required: true }, // Assuming you have a Job model
//   },
//   { timestamps: true }
// );

// const Application = mongoose.model("Application", applicationSchema);

// module.exports = Application;

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  education: { type: String, required: true },
  degree: { type: String, required: true },
  resume: { type: String, required: true }, // No need for jobId anymore
});

const Application = mongoose.model("Application", applicationSchema);
