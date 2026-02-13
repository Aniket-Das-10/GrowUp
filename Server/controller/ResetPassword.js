const User = require('../models/User');
const mailsender = require('../utils/mailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const crypto = require("crypto");


exports.resetPasswordToken = async (req,res) => {
    try{
        //get email from request body
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }
    //generate token
    const token = await crypto.randomUUID();
    //update user token and expire time
    const updateDetails = User.findOneAndUpdate(
        {email: email},
        {
            token:token,
            resetPasswordExpire:Date.now() + 5 * 60 * 1000
        },
        {new: true}
    )
    //generate url
    const url= `http://localhost:3000/update-password/${token}`
    //send email containg url
    await mailsender(email,"password rest link",`password rest link:${url}`);
    return res.status(200).json({
        success:true,
        message: "email sent success fully, please check email"
    });

    //send response
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "something went wrong while sending mail"
        })
    };
}

exports.resetPassword = async (req,res)=>{
    try{
        //data fetch
        const {email,password,confirmPassword,token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password is not matched"
            })
        };
        //get user data from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry -- invalid token
        if(!userDetails){
            return res.ststus(400).json({
                success: false,
                message: "invalid token"
            })
        }
        //token time check
        if(userDetails.resetPasswordExpire < Date.now()){
            return res.status(400).json({
                success: false,
                messsage: "Token time expire, please regenerae the token" 
            })
        };
        //hash password
        const hasPassword = await bcrypt.hash(password,10);
        //update password
        await User.findOneAndUpdate(
            {token: token},
            {
                password: hasPassword,                
            },
            {new: true}
        )
        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "went somthing wrong while sending reset email"
        });
    }
};