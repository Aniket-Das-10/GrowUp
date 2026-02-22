const Courses = require("../models/Courses");
const Section = require("../models/Section");

//create section
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            })
        };

        const newSection = await Section.create({ sectionName });
        const updatedCourse = await Courses.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse
        })
    } catch (error) {
        console.error("Error creating section:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create Section",
            error: error.message
        })
    }
};

// Update section
exports.updateSection = async (req, res) => {
    try {
        const { sectionId, sectionName, courseId } = req.body;

        if (!sectionId || !sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            })
        };

        await Section.findByIdAndUpdate(
            sectionId,
            { sectionName: sectionName },
            { new: true }
        );

        const course = await Courses.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section Updated successfully",
            data: course
        });
    } catch (error) {
        console.error("Error updating section:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update section",
            error: error.message
        })
    }
}

// delete section
exports.deletSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            })
        };

        // Remove section from course
        await Courses.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        // Delete sub-sections
        // Note: In a real app we might want to delete actual SubSection entries here too

        await Section.findByIdAndDelete(sectionId);

        // find the updated course and return it
        const course = await Courses.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section Deleted successfully",
            data: course
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to Delete section",
            error: error.message
        })
    }
};
