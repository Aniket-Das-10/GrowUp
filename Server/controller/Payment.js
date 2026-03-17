const { instance } = require('../config/razorpay');
const Courses = require('../models/Courses');
const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require('../Template/CourseEnrollmentEmail');
const { paymentSuccessEmail } = require("../Template/PaymentSuccessEmail");
const { default: mongoose } = require('mongoose');
const crypto = require("crypto");
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide course ids"
        })
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Courses.findById(course_id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }

            totalAmount += course.price;

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
};

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // Enroll students
        try {
            await enrollStudents(courses, userId);
            return res.status(200).json({ success: true, message: "Payment Verified" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    return res.status(200).json({ success: false, message: "Payment Failed" });
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details"
        })
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );
        return res.status(200).json({ success: true, message: "Email Sent" });
    }
    catch (error) {
        console.log("error in sending mail", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
};

const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Please provide courses and userId");
    }

    for (const courseId of courses) {
        // Find the course and enroll the student in it
        const enrolledCourse = await Courses.findOneAndUpdate(
            { _id: courseId },
            { $push: { studentEnrolled: userId } },
            { new: true }
        )

        if (!enrolledCourse) {
            throw new Error(`Course not found: ${courseId}`);
        }

        // Create CourseProgress for the student
        const courseProgress = await CourseProgress.create({
            courseId: courseId,
            userId: userId,
            completedVideos: [],
        });

        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id
                }
            },
            { new: true }
        );

        if (!enrolledStudent) {
            throw new Error(`User not found: ${userId}`);
        }

        // Send enrollment email
        await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
        );
    }
}