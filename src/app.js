const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/jobs", jobRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.log(`Error connecting DB + ${error}`)
    })
