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

const allowedOrigins = ["http://localhost:5173","https://ai-symptom-checker-and-virtual-doctor-client.vercel.app","https://ai-symptom-checker-and-virtual-doctor-client.vercel.app/"]

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin:allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true ,
}));

app.use((req, res, next) => {
    console.log(`Request from: ${req.headers.origin}`);
    next();
});


//api endpoints
app.get("/",()=>{
    res.send("<h1>API WORKING</h1>")
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/result', resultRouter)

app.listen(port, () => console.log(`running on ${port}`));
