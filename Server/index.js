const dotenv = require('dotenv');
dotenv.config(); // 👈 MUST BE FIRST

const express = require('express');
const app = express();

const userRoutes = require('./Route/User');
const profileRoutes = require('./Route/Profile');
const courseRoutes = require('./Route/Course');
const paymentRoutes = require('./Route/Payment');
const contaceRoutes = require('./Route/Contact');

const database = require('./config/dbconnection');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/Cloudinary');

const PORT = process.env.PORT || 4000;

// DB connection
database();

// Middlewares
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://grow-up-seven.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.some(al => origin.startsWith(al))) {
        callback(null, true);
      } else {
        console.log("Origin not allowed by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contaceRoutes);

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to GrowUp",
  });
});

// Server
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});

// Export the Express app for Vercel Serverless Functions
module.exports = app;
