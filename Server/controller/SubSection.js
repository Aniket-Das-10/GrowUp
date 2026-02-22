const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const Courses = require('../models/Courses');
const { uploadImageToCloudinary } = require('../utils/imageUploder');

exports.createSubsection = async (req, res) => {
    try {
        const { sectionId, title, description, courseId } = req.body;
        const video = req.files.video;

        if (!sectionId || !title || !description || !video || !courseId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        };

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionDetails._id } },
            { new: true },
        );

        const updatedCourse = await Courses.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Lecture Added Successfully"
        })

    }
    catch (error) {
        console.error("Error creating new sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description, courseId } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "subSection not found",
            });
        }

        if (title !== undefined) {
            subSection.title = title;
        }
        if (description !== undefined) {
            subSection.description = description;
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );

            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }
        await subSection.save();

        const updatedCourse = await Courses.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.json({
            success: true,
            message: "section updated successfully",
            data: updatedCourse
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        });
    }
};

exports.deletSubsection = async (req, res) => {
    try {
        const { sectionId, subSectionId, courseId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: subSectionId } },
        );

        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId
        });
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "subsection not found"
            });
        }

        const updatedCourse = await Courses.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedCourse,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
