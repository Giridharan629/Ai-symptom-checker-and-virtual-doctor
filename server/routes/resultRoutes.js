import express from "express";
import { data } from "../controllers/detailsController.js";
import userAuth from "../middleware/userAuth.js";

const resultRouter = express.Router();

resultRouter.post("/data",userAuth,data)

export default resultRouter;