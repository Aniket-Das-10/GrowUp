const express = require("express");
const router = express.Router();
const {
  capturePayment,
  verifyPayment,
  enrollInFreeCourse,
  sendPaymentSuccessEmail,
} = require("../controller/Payment");

const { auth, isStudent } = require("../middleware/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/enrollInFreeCourse", auth, isStudent, enrollInFreeCourse);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;
