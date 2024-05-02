import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},"rJO4Foy7zHlZ06NpdBFYUcdwEFKsNXXA017iK8YUMeA=",{
        expiresIn:'15d'
    });

    res.cookie("jwtToken",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in milli Seconds
        httpOnly: true, // prevents XSS attacks also known as cross site scripting attacks
        sameSite: "strict" //CSRF attacks cross site request forgery attacks
    })
}

export default generateTokenAndSetCookie;