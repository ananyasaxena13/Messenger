import bcrypt from "bcrypt"
import User from "../models/userModel.js"

export const loginUser = async (res,req) => {
    try {
        console.log('loginUser');
    
    }
    catch (e) {
        console.log(e);
    }
}

export const signupUser = async (res,req) => {
    try {
        console.log('signupUser');
        if(req.body.password == req.body.confirmPassword){
            const data ={
                fullName: req.body.fullname,
                userName: req.body.username,
                password: req.body.password
            }
            const existingUser = await User.findOne({username: data.userName});
    
            if(existingUser) {
                 res.send("User already exists");
            }
            else {
                const saltRound = await bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hashSync(data.password, saltRound);
                data.password = hashedPassword;
                const newUser = await User.insertMany(data);
                res.redirect('/api/auth/login');
            }
    
        }
        else{
            res.send("Password does not match");
        
        }
    }
    catch (e) {
        console.log(e);
    }
}

export const logoutUser = async (res,req) => {
    try {
        console.log('loginUser');
    
    }
    catch (e) {
        console.log(e);
    }
}
