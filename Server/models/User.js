const mongoose = require('mongoose');

const user =new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
            trim: true
        },
        lastName:{
            type:String,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            trim: true
        },        
        password:{
            type:String,
            required: true           
        },        
        accountType:{
            type: String,
            enmu:["Admin","Student", "Instructor"],
            required:true
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Courses"
        }],
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true
        },
        courseProgress:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ],
        token: {
            type: String,
        },
        img:{
            type:String,
            required:true
        },
        token:{
            type:String
        },
        resetPasswordExpire:{
            type: Date
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("User",user);