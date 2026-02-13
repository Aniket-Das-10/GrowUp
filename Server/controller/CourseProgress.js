const mongoose = require('mongoose');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const Course = require('../models/Courses');

exports.updateCouseProgress = async (req, res ) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        const subsection = await SubSection.findById(subSectionId);
        if(!subsection){
            return res.status(404).json({
                error: "Invalid Subsection",
            })
        };
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if(!courseProgress){
            return res.status(400).json({
                success: false,
                message: "course Progress does not exist"
            })
        }else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error: "Subsection already completed",
                })
            }
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            message: "CourseProgress Updated",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        error: "Internal server error",
        });
    }
};