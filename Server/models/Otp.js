const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../Template/EmailVerification");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // seconds (TTL index)
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Email from GrowUp",
      emailTemplate(otp)
    );
  } catch (error) {
    console.log("Error while sending email:", error);
    throw error;
  }
}

// ✅ ASYNC STYLE — NO next()
otpSchema.pre("save", async function () {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

module.exports = mongoose.model("Otp", otpSchema);
