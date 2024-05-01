import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";



export const loginController = async (req,res) =>{
    try
    {
        const {username,password} = req.body;

        const user = await User.findOne({username});
        const correctPassword = await bcrypt.compare(password,user?.password || "");
        if(!user || !correctPassword)   return res.status(400).json({message:"Invalid Credentials"});
        generateTokenAndSetCookie(user._id,res);
        return res.status(200).json({message:"User Logged In Successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}

export const registerController = async (req,res) =>{
    try{

        const {username,fullname,password,confirmPassword} = req.body;

        if(password != confirmPassword) return res.status(400).json({message:"Password does not match"});

        const user = await User.findOne({username});

        if(user)    return res.status(201).json({message:"User Already Exists"})

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username:username,
            fullname:fullname,
            password:hashpassword,
            about:"",
            profileImg:"https://tse2.mm.bing.net/th?id=OIP.GqGVPkLpUlSo5SmeDogUdwHaHa&pid=Api&P=0&h=180",
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            return res.status(201).json({message:"User Registered Successfully"})
        }
        else    res.status(400).json({message:"Invalid User Data"})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}

export const logoutController = (req,res)=>{
    try{
        res.cookie("jwtToken","",{maxAge:0});
        return res.status(200).json({message:"User Logged Out Successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}