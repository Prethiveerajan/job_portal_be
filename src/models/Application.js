const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  education: { type: String, required: true },
  degree: { type: String, required: true },
  resume: { type: String, required: true }, // No need for jobId anymore
});

const Application = mongoose.model("Application", applicationSchema);
