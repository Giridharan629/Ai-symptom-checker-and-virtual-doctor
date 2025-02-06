import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";

import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import resultRouter from "./routes/resultRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
connectDb();

const allowedOrigins = process.env.FRONTEND_URL

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:allowedOrigins, credentials: true }));

//api endpoints
app.get("/",(req,res)=>{
    res.send("<h1>API WORKING</h1>")
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/result', resultRouter)

app.listen(port, () => console.log(`running on ${port}`));
