const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res)=>{
    try{
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401)
            .json({
                success: false,
                message: "User already Exsisted."
            })
        };

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars:false
        });
        console.log(otp);
        
        const result = await OTP.findOne({otp:otp});
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        while(result){
            otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,            
            });
        };

        const otppayLoad = {email,otp};
        const otpBody = await OTP.create(otppayLoad);
        console.log(otpBody);        
        res.status(200)
        .json({
            success: true,
            message: "Otp generate successfully",
            otp
        });
    }
    catch(error){
       console.log(error);
       return res.status(500)
       .json({
        success: false,
        message: "went something wrong while sending otp"
       })
    }
};

exports.signUp = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      contactNumber,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (!email || !firstName || !lastName || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const approved = accountType === "Instructor" ? false : true;

    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      approved,
      additionalDetails: profile._id,
      img: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, try again later",
    });
  }
};


exports.logIn = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403)
            .json({
                success: false,
                message: "All fields are requires"
            })
        };

        const user = await User.findOne({email});
        if(!user){
            return res.status(401)
            .json({
                success: false,
                message: "User is not registered,Please sign up first"
            })
        }

        if(bcrypt.compare(password,user.password)){
            const payLoad ={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
              expiresIn: "2h",
            });


            user.token=token;
            user.password = undefined;

            const options = {
              expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };


            res.cookie("token",token,options).status(200)
            .json({
                success:true,
                token,
                user,
                message: "login successfull"
            })
        }else{
            return res.status(401)
            .json({
                success:false,
                message: "Password is incrroct"
            })
        };

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure, Please try again"
        })

    }
};

exports.changePassword = async (req,res) => {

}