const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================= AUTH MIDDLEWARE =================
exports.auth = async (req, res, next) => {
  try {

    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);


    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {

      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (error) {

      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }


    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token: ${error.message}`,
    });
  }
};


// ================= STUDENT =================
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This route is for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// ================= INSTRUCTOR =================
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "This route is for Instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// ================= ADMIN =================
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This route is for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
