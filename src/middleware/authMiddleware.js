const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    let token = req.headers.authorization;
  
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
};
