const ratingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Courses');
const mongoose = require('mongoose');
const RatingAndReview = require('../models/RatingAndReview');

exports.createRating = async (req,res) => {
    const userId = req.user.id;
    const {courseId,rating,review} = req.body;

    try{
            const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: {$elemMatch: {$eq: userId}},
        });

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course"
            });
        }

        const alreadyReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if(alreadyReview){
            return res.status(403).json({
                success: false,
                message: "Course already reviewed by user",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });
        
        await Course.findByIdAndUpdate(courseId,
            {$push:
                {ratingAndReview: ratingReview}
            }
        )
        await courseDetails.save();
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        });
    }
    
};

exports.getAverageRating = async (req,res) => {
     try {
    const courseId = req.body.courseId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    });
  }
};

exports.getAllRatingAndReview = async (req,res) => {
    try{
        const allReview = await RatingAndReview.find({})
        .sort({rating: "desc"})
        .populate({
            path: "user",
            select: "firstName lastName email img",
        })
        .populate({
            path: "course",
            select: "courseName",
        })
        .exec();
        res.status(200).json({
            success: true,
            data: allReview,
        });
    }catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};