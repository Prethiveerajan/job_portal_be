const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;  // Include role in the request body
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Default to 'user' if no role is specified, otherwise assign the role passed
      const newUser = new User({
        name,
        email,
        password,
        role: role || "user",  // Default role is 'user', or use the provided role
      });
  
      // Save the new user to the database
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // ✅ Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  exports.forgotPassword = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        console.log("User found:", user);

        // Check if user has a valid email
        if (!user.email) {
            return res.status(400).json({ message: "Invalid user email" });
        }

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store the reset token in the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // ✅ Define transporter before sending the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
        console.log("Sending email to:", user.email);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email, // ✅ Make sure this is defined
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetURL}">${resetURL}</a>
                   <p>This link will expire in 1 hour.</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully!");

        res.status(200).json({ message: "Password reset email sent!" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// exports.register = async (req, res) => {
//   try {
      

//       const { name, email, password, role } = req.body;

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//           return res.status(400).json({ message: "Email already in use" });
//       }

//       const newUser = new User({ name, email, password, role: role || "user" });
//       await newUser.save();

//       res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
      

//       const { email, password } = req.body;
//       const user = await User.findOne({ email });

//       if (!user) {
//           return res.status(400).json({ message: "Invalid credentials" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           return res.status(400).json({ message: "Invalid credentials" });
//       }

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//       res.json({ token, user });
//   } catch (error) {
//       console.error("Login error:", error);
//       res.status(500).json({ message: "Server error" });
//   }
// };

// exports.forgotPassword = async (req, res) => {
//   try {
      

//       const { email } = req.body;
//       if (!email) return res.status(400).json({ message: "Email is required" });

//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ message: "User not found" });

//       const resetToken = crypto.randomBytes(32).toString("hex");
//       user.resetPasswordToken = resetToken;
//       user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//       await user.save();

//       const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

//       const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//       });

//       const mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: user.email,
//           subject: "Password Reset Request",
//           html: `<p>You requested a password reset. Click the link below:</p>
//                  <a href="${resetURL}">${resetURL}</a>
//                  <p>This link will expire in 1 hour.</p>`,
//       };

//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: "Password reset email sent!" });
//   } catch (error) {
//       console.error("Forgot Password Error:", error);
//       res.status(500).json({ message: error.message });
//   }
// };


exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log("Received token:", token);

        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        console.log("User found:", user);

        // ✅ Hash the new password before saving it
        const salt = await bcrypt.genSalt(10);  // You can adjust the salt rounds as needed
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear the reset token
        user.resetPasswordToken = null;

        await user.save();

        res.json({ message: "Password has been reset successfully!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};


exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]; 
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.user = decoded; // ✅ Attach decoded user info to request
        next();
      } catch (error) {
        console.error("JWT Authentication Error:", error);
        return res.status(401).json({ message: "Invalid token, authorization denied" });
      }
    } else {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }
  };