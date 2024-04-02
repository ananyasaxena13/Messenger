import express from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register",async(req,res)=>{
    const {username, email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(user)    return res.json({message: "User Already Existed"});

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = new UserModel({
        username,
        email,
        password:hashpassword
        
    })

    await newuser.save();
    return res.json({status:true,message: "User Registered"});

});

router.post("/",async(req,res)=>{
    const{email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user)   return res.json({message: "User Not Registered!"});

    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword)  return res.json({message: "Password is InCorrect"});

    const token = jwt.sign({username:user.username},"jwtWebToken",{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge: 360000});
    return res.json({status:true,message:"Login Successfully"});
})

export {router};