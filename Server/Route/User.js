const express = require("express");
const router = express.Router();

const {
  logIn,
  signUp,
  sendOTP,
  changePassword,
} = require("../controller/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../Controller/ResetPassword");

const { auth } = require("../Middleware/Auth");

router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);

router.post("/reset-password", resetPassword);

module.exports = router;
