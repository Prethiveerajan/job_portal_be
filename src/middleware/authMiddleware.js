const jwt = require("jsonwebtoken");


exports.protect = (req, res, next) => {
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Attach decoded user info to request
      next();
    } catch (error) {
      console.error("JWT Authentication Error:", error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  

  

  exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
  
