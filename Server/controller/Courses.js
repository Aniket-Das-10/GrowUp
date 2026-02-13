const Course = require('../models/Courses');
const SubSection = require('../models/SubSection');
const Category = require('../models/Category');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploder');
require('dotenv').config();



exports.createCourse = async (req, res) => {
  try {
    //get data from req body
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      courseContent,
      price,
      tag
    } = req.body;

    const thumnail = req.files.thumnailImage;

    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumnail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    };

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log(instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found"
      })
    };

    const tagDetalis = await Category.findById(tag);
    if (!tagDetalis) {
      return res.status(400).json({
        success: false,
        message: "Category details not found"
      })
    };

    const thumnailImage = await uploadImageToCloudinary(thumnail, process.env.FOLDER_NAME);

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: userId,
      whatYouWillLearn,
      price,
      tag: tagDetalis._id,
      thumbnail: thumnailImage.secure_url,
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: newCourse._id
        }
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: tagDetalis._id },
      {
        $push: {
          course: newCourse._id
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: "New course created successfully"
    })



  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to create course"
    })
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        instructor: true,
        whatYouWillLearn: true,
        ratingAndReview: true,
        price: true,
        thumbnail: true,
        tag: true
      });

    return res.status(200).json({
      success: true,
      message: "All courses data fatched successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to fatch all the courses details"
    })
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      })
    };

    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumnailImage;
      const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
      courseDetails.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          courseDetails[key] = JSON.parse(updates[key]);
        } else {
          courseDetails[key] = updates[key]
        }
      }
    };

    await courseDetails.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails"
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getcoursesDelails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionDetails"
        }
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "videoUrl"
        }
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    };

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });



  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studentsEnrolled = course.studentsEnroled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};