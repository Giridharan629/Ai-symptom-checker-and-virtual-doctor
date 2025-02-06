import express from "express";
import { isAuthonticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyOtp } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

authRouter.post("/verify-otp", userAuth , verifyOtp);

authRouter.get("/is-auth", userAuth , isAuthonticated);

authRouter.post("/send-reset-otp" , sendResetOtp);

authRouter.post("/reset-password" , resetPassword);


export default authRouter