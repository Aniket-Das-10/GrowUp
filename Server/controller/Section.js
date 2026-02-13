const Courses = require("../models/Courses");
const Section = require("../models/Section");

//create section
exports.createSection = async (req,res) => {
    try{
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                successs: false,
                message: "Missing Properties"
            })
        };

        const createSection = await Section.create({sectionName});
        const updateUser = await Courses.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:createSection._id
                }
            },
            {new:true}
        )
        return res.status(200).json({
            success: true,
            message: "Section created successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:true,
            message: "Unable to create Section"
        })
    }
};
//Update section
exports.updateSection = async (req,res) =>{
    try{
        const {sectionId,sectionName} = req.body;

        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                messsage: "Section not found"
            })
        };


        const updateSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName:sectionName},
            {new:true}
        );

        return res.status(200).json({
            success: true,
            message: "Section Update succesfully",
            updateSection
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update section"
        })
    }
}
//delet section
exports.deletSection = async (req,res) => {
    try{
        const {sectionId} = req.body;
        
        if(!sectionId){
            return res.status(400).json({
                success: true,
                message: "Section not found"
            })
        };

        await Section.findByIdAndDelete(sectionId)

        return res.status(200).json({
            success: true,
            message: "Section Delete succesfully"
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to Delete section"
        })
    }
};