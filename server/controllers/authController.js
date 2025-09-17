
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js';
import transporter from '../config/nodeMailer.js';



export const register = async (req, res)=>{
    const {name, email, password, age, gender} = req.body;


    if(!name){
        return res.json({success:false, message: "Please Enter Name"})
    }
    if(!email){
        return res.json({success:false, message: "Please Enter Email correctly"})
    }
    if(!password){
        return res.json({success:false, message: "Please Enter Password"})
    }
    if(!age){
        return res.json({success:false, message: "Please Enter Age"})
    }
    if(!gender){
        return res.json({success:false, message: "Please Enter Gender"})
    }

    try {

        const existingUser = await userModel.findOne({email:email})

        if(existingUser){
            return res.json({success:false, message:"Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new userModel( {name, email, password : hashedPassword, age, gender })

        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"7d"});

        res.cookie("token",token,{
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 7 *24 * 60 * 60 * 1000,

        })

        const mailOptions = {
            from:`"Ai Symptom Checker" ${process.env.SENDER_EMAIL}`,
            to: email,
            subject:"🚀 Big Announcement Inside!",
            html:`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Welcome Email</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                        .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
                        h1 { color: #333; }
                        p { font-size: 16px; color: #555; }
                        .btn { display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; margin-top: 10px; }
                        .footer { font-size: 12px; color: #888; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>👋 Welcome, ${name}!</h1>
                        <p>Thank you for joining <strong>AI Symptom Checker</strong>. We're here to help you analyze your symptoms and provide instant health insights. 🏥</p>
                        <p>Get started by logging in and checking your symptoms now:</p>
                        <a href="https://yourwebsite.com/login" class="btn">Start Checking</a>
                        <p class="footer">&copy; 2025 AI Symptom Checker. All rights reserved.</p>
                    </div>
                </body>
                </html>
            `
        }

        await transporter.sendMail(mailOptions)

        
        return res.json({success:true})
        
    } catch (error) {
        res.json({success:false, message: error.message})
    }

}


export const login = async (req, res)=>{

    const {email, password} = req.body;

    
    if(!email){
        return res.json({success:false, message: "Please Enter Email"})
    }
    if(!password){
        return res.json({success:false, message: "Please Enter Password"})
    }


    try {

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"Invalid email"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:true, message:"Incorrect password"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7*24*60*60*1000
        })

        

        return res.json({success:true})

        
    } catch (error) {

        return res.json({success:false, message:error.message,in:"error"})
        
    }

}


export const logout = async (req, res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        return res.json({success:true, message:"Logged out"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}


export const sendVerifyOtp = async (req,res) =>{
    try {
        
        const {userId} = req.body;

        const user = await userModel.findById(userId)

        if(user.isAccVerified){
            return res.json({success:false, message:"Account already verified"})
        }

        const otp = String(Math.floor(100000+ Math.random() * 900000));

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 60 * 60 * 1000;

        await user.save()

        const mailOptions = {
            from :`"Ai Symptom Checker" ${process.env.SENDER_EMAIL}`,
            to : user.email,
            subject: "🔐 Your OTP Code for AI Symptom Checker",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>OTP Verification</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                        .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
                        h1 { color: #333; }
                        p { font-size: 16px; color: #555; }
                        .otp { font-size: 24px; font-weight: bold; background: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; }
                        .footer { font-size: 12px; color: #888; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🔐 Hello, ${user.name}!</h1>
                        <p>Your One-Time Password (OTP) for AI Symptom Checker is:</p>
                        <p class="otp">${otp}</p>
                        <p>Please enter this OTP within the next <strong>1 hour</strong> to verify your identity.</p>
                        <p>If you didn’t request this, please ignore this email.</p>
                        <p class="footer">&copy; 2025 AI Symptom Checker. All rights reserved.</p>
                    </div>
                </body>
                </html>
            `
        }

        await transporter.sendMail(mailOptions)

        return res.json({success:true, message: "OTP send successfully"})


    } catch (error) {

        res.json({success:true, message:error.message})
        
    }
}

export const verifyOtp = async (req, res)=>{

    try {

        const {userId, otp} = req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message:"user not found"})
        }

        if(user.verifyOtp ===  "" || user.verifyOtp !== otp){
            return res.json({success:false, message: "Invalid OTP"})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP Expired"})
        }

        user.isAccVerified = true;
        user.verifyOtp = ""
        user.verifyOtpExpireAt = 0

        await user.save();
        
        return res.json({success:true, message:"Account verified "})

    } catch (error) {
        res.json({success:false, message : error.message})
    }

}



export const isAuthonticated = (req, res)=>{
    try {

        return res.json({success:true})
        
    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}



/// reset password 

export const sendResetOtp = async(req, res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false, message:"Please enter Email"})
    }

    try {
        
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        const otp = String(Math.floor( 100000 + Math.random() * 900000 ))

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;

        user.save();

        const mailOptions = {
            from:`"Ai Symptom Checker" ${process.env.SENDER_EMAIL}`,
            to: email,
            subject:"🔐 Reset Your Password - OTP Inside",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Password Reset OTP</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                        .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
                        h1 { color: #333; }
                        p { font-size: 16px; color: #555; }
                        .otp { font-size: 24px; font-weight: bold; background: #ff5722; color: #ffffff; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; }
                        .footer { font-size: 12px; color: #888; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🔐 Password Reset Request</h1>
                        <p>Hello, ${user.name},</p>
                        <p>We received a request to reset your password for your AI Symptom Checker account.</p>
                        <p>Your One-Time Password (OTP) is:</p>
                        <p class="otp">${otp}</p>
                        <p>Please enter this OTP within the next <strong>10 minutes</strong> to reset your password.</p>
                        <p>If you didn’t request this, please ignore this email or contact support.</p>
                        <p class="footer">&copy; 2025 AI Symptom Checker. All rights reserved.</p>
                    </div>
                </body>
                </html>
            `
        }

        await transporter.sendMail(mailOptions)

        return res.json({success:true, message:"OTP Sent Successfully"})

    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}


export const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email){
        return res.json({success:false, message:"Please enter Email"})
    }
    if(!otp){
        return res.json({success:false, message:"Please enter OTP"})
    }
    if(!newPassword){
        return res.json({success:false, message:"Please enter New Password"})
    }

    try {

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User Not Found"})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message: "OTP Expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword
        user.resetOtp = ""
        user.resetOtpExpireAt = 0;

        await user.save()

        return res.json({success:true, message:"Password Changed successfully"})
        
        
    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}