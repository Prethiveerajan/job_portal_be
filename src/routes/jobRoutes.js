
// const express = require("express");
// const {
//   createJob,
//   getAllJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   searchJobs,
// } = require("../controllers/jobController");

// const router = express.Router();

// router.post("/create", createJob);
// router.get("/", getAllJobs);
// router.get("/:id", getJobById);
// router.put("/:id", updateJob);
// router.delete("/:id", deleteJob);
// router.get("/search", searchJobs);

// module.exports = router;

const express = require("express");
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
