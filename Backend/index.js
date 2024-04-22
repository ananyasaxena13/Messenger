import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./mongoDB/connectDb.js"
import {router} from "./Routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3001"],
    credentials:true,
    optionSuccessStatus:200
}))
app.use(cookieParser());
app.use("/",router);

connectDB("mongodb://localhost:27017/Messenger");




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})