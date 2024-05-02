import User from "../models/userModel.js";


export const getUserDataController = async(req,res) =>{
    try{
        const username = req.params.username;
        const data = await User.find({username});
        return res.status(201).json({data:data});
    }
    catch(e){console.log(e)}
}

export const postDescription = async(req,res) =>{
    try{
        const username = req.params.username;
        const data = await User.find({username});
        const {description} = req.body;
        await User.updateOne({username:username},{about:description});
        return res.status(201).json({message:"Updated Successfully"});
    }
    catch(e){console.log(e)}
}

export const postProfilePhoto = async(req,res) =>{
    try{
        const username = req.params.username;
        const data = await User.find({username});
        const {file} = req.file;
    }
    catch(e){console.log(e)}
}