

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const jobRoutes = require("./routes/jobRoutes");
// const authRoutes = require("./routes/authRoutes"); 
// const errorHandler = require("./middleware/errorMiddleware");
// // const cors = require('cors')
// const cookieParser = require('cookie-parser')
// dotenv.config();
// const app = express();



// app.use(cors())
// app.use(cookieParser())
// app.use(express.urlencoded({ extended: true}))
// ;
// app.use(express.json());

// app.use("/api/jobs", jobRoutes);
// app.use("/api/auth", authRoutes);


// app.use("/api/jobs", jobRoutes);
// app.use("/api/auth", authRoutes); 
// app.use(errorHandler);
// const PORT = process.env.PORT || 5000;
// connectDB()
//     .then(() => {
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch((error) => {
//         console.log(`Error connecting DB: ${error}`);
//     });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();




app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true, // ✅ Allow cookies & authentication headers
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // ✅ Allow methods
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-CSRF-Token",
//       "X-Requested-With",
//       "Accept",
//       "Accept-Version",
//     ], // ✅ Allow specific headers
//   })
// );

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`❌ Error connecting DB: ${error}`);
  });
