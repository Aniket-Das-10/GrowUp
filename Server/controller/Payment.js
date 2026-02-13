const {instance} = require('../config/razorpay');
const Courses = require('../models/Courses');
const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require('../Template/CourseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { json } = require('express');
const CourseProgress = require('../models/CourseProgress');

 

 
exports.capturePayment = async (req,res) => {
    const {course_id} = req.body;
    const userId = req.user.id;
    if(!course_id){
        return res.status(404).json({
            success: false,
            message: "course not found"
        })
    };

    let course;
    try{
        course = await Courses.findById(course_id);
        if(!course){
            return res.status(400).json({
                success: false,
                message: "course details is empty"
            })
        }

        const uid  = new mongoose.Types.ObjectId(userId);
        if(Courses.studentEnrolled.include(uid)){
            return res.status(200).json({
                success: false,
                message: "Student alredy enrolled."
            })
        }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    const amount = Courses.price;
    const currency = "INR"

    const option ={
        amount : amount*100,
        currency,
        recipt : Math.random(Date.now()).toString(),
        notes:{
            courseId :  course_id,
            userId
        }
    };

    try{
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);
        return res.staus(200).json({
            success: true,
            courseName:Courses.courseName,
            courseDetails: Courses.courseDetails,
            thumbnail: Courses.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "could not initiate order"
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
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({ success: false, message: "Payment Failed" });
};

exports.sendPaymentSuccessEmail = async (req,res) => {
    const {orderId, paymentId, amount } = req.body;
    
    const userId = req.user.id;
    if( !orderId || !paymentId || !amount || !userId){
        return res.status(404).json({
            success: false,
            message: "Please provide all the details"
        })
    };
    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `payment Recived`,
            this.sendPaymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        );
    }
    catch(error) {
        console.log("error in sending mail", error);
        return res
        .status(400)
        .json({ success: false, message: "Could not send email" });
    
    }
};

const enrolledStudent = async (courses,userId,res) => {
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message: "please provide all the details",
        })
    }

    for ( const courseId of courses) {
        try{
            const enrolledCourse = await Courses.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentEnrolled: userId}},
                {new: true}
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Course nor found"
                })
            }
            console.log("Updated course: ",enrolledCourse);

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            });
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: CourseProgress._id
                    }
                },
                {new: true}
            );
            console.log("enrolledStudent : ",enrolledStudent);

            const emailResponse = await mailSender(
                enrolledStudent.email,
                `successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );
            console.log("Email sent Successfully: ",emailResponse.response);
        }
        catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
        }
    };
}