import toast from "react-hot-toast";

export const Signup = async (fullname,username,password,confirmPassword) =>{
    const success = handleInputErrors(fullname,username,password,confirmPassword);
    if(!success)    return;
    try{
        const res = await fetch("http://localhost:4000/register",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({fullname,username,password,confirmPassword})
        })
        const data = await res.json();
        toast.success(`${data.message}`);
        return true;
    }
    catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}

function handleInputErrors(fullname,username,password,confirmPassword){
    if(!fullname || !username || !password || !confirmPassword){
        toast.error('Please enter all details');
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }
    if(password.length <= 6){
        toast.error("Password Length Should be More than 6");
        return false;
    }
    return true;
}