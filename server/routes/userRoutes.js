import express from "express";
import { changeUserDetails, getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRoutes = express.Router();


userRoutes.get("/data",userAuth, getUserData)
userRoutes.post("/update-data", userAuth, changeUserDetails)


export default userRoutes