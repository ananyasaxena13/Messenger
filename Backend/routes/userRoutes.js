import express from "express";
import User from "../models/userModel.js";


const router = express.Router();

router.get("/allUser", async (req, res)=>{
    try{
        const users = await User.find({});
        return res.json(users);
    }
    catch(e){console.log(e)}
})

export default router;