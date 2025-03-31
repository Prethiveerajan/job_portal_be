const express = require("express");
const router = express.Router();
const { submitApplication } = require("../controllers/applicationController");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Add this line to import fs

// Set up storage for resume files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    // Check if the uploads folder exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder is created
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for uniqueness
  },
});

const upload = multer({ storage: storage });

// Define the route for submitting applications
router.post("/submit", submitApplication);

module.exports = router;
