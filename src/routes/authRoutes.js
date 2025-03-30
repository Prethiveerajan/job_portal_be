// const express = require("express");
// const { register, login, logout, getUser,forgotPassword,resetPassword } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/login", login); 
// router.post("/forgot-password", forgotPassword);
// router.post("/signup", register);  
// router.post("/logout", logout);
// router.get("/me", protect, getUser);
// // router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/reset-password/:token", resetPassword);



// module.exports = router;

const express = require("express");
const { register, login, logout, getUser, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/signup", register);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.post("/logout", logout);
router.get("/me", protect, getUser);  // Protect this route

// Admin-only route example
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" }); // This route will only be accessible by an admin
});

module.exports = router;
