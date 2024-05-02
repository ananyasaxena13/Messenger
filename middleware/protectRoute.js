import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async(req,res,next) =>{
    try{
        const token = req.cookies.jwtToken;

        if(!token)  return res.status(401).json({message:"Unauthorized - No Token Provided"});
        const decoded = jwt.verify(token,"rJO4Foy7zHlZ06NpdBFYUcdwEFKsNXXA017iK8YUMeA=");
        if(!decoded)    return res.status(401).json({message:"Unauthorized - Invalid Token"});

        const user = await User.findById(decoded.userId).select("-password");
        if(!user)   return res.status(404).json({message:"User not Found"});

        req.user = user;

        next();
    }
    catch(e){
        console.log("Error in the Protect route Middleware:"+e);
    }
}