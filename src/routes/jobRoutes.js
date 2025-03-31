

const express = require("express");
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id",deleteJob);

module.exports = router;
