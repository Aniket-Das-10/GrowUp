const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getcoursesDelails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../Controller/Courses");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../Controller/Category");

const {
  createSection,
  updateSection,
  deletSection,
} = require("../Controller/Section");

const {
  createSubsection,
  updateSubSection,
  deletSubsection,
} = require("../Controller/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRatingAndReview,
} = require("../Controller/RatingandReview");
const {
  updateCouseProgress,
  //getProgressPercentage,
} = require("../Controller/CourseProgress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../Middleware/Auth");

router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/editCourse", auth, isInstructor, editCourse);

router.post("/addSection", auth, isInstructor, createSection);

router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/deleteSection", auth, isInstructor, deletSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);

router.post("/deleteSubSection", auth, isInstructor, deletSubsection);

router.post("/addSubSection", auth, isInstructor, createSubsection);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

router.get("/getAllCourses", getAllCourses);

router.post("/getCourseDetails", getcoursesDelails);

router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCouseProgress);

router.delete("/deleteCourse", deleteCourse);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReview);

module.exports = router;
