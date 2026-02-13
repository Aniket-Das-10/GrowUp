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
app.use(
  cors({
    origin: "http://localhost:3000",
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
