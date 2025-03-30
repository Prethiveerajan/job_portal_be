

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




app.use(
  cors({
    origin: [
      "http://localhost:3000",  // Local development frontend
      "http://localhost:5173",  // Vite-based frontend
      "https://job-portal-fe-five.vercel.app" // Your Vercel frontend URL
    ],
    credentials: true, // Allow cookies
  })
);





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
