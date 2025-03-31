const multer = require('multer');

// Define file storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);  // Save with timestamp
  },
});

const upload = multer({ storage: storage }).single('resume'); // 'resume' is the field name for the file

exports.submitApplication = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }

    const { name, education, degree } = req.body;
    const resumeFile = req.file;

    // Check if all required fields are provided
    if (!name || !education || !degree || !resumeFile) {
      return res.status(400).json({
        message: 'Missing required fields (name, education, degree, resume)',
      });
    }

    // Process the application data here
    // (e.g., save to database)

    res.status(200).json({
      message: 'Application submitted successfully',
      data: { name, education, degree, resume: resumeFile },
    });
  });
};
