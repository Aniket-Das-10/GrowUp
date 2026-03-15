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
} = require("../controller/Courses");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controller/Category");

const {
  createSection,
  updateSection,
  deletSection,
} = require("../controller/Section");

const {
  createSubsection,
  updateSubSection,
  deletSubsection,
} = require("../controller/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRatingAndReview,
} = require("../controller/RatingAndReview");
const {
  updateCouseProgress,
  //getProgressPercentage,
} = require("../controller/CourseProgress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/auth");

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
