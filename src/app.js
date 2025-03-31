

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes"); 
const errorHandler = require("./middleware/errorMiddleware");
dotenv.config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://job-portal-fe-five.vercel.app",
  ],
  credentials: true, // Allow cookies & Authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all necessary methods
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests explicitly

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes); 
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.log(`Error connecting DB: ${error}`);
    });

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());



// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:5173"], // ✅ Allow multiple origins
//   credentials: true,
// }));


// // Import routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
