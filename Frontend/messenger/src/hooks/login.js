import toast from "react-hot-toast";


export const Login = async(username,password) =>{
    const success = handleInputErrors(username,password);
    if(!success)    return;
    try{
        const res = await fetch("http://localhost:4000/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username,password})
        })
        const data = await res.json();
        toast.success(`${data.message}`);

        if(data.message === "User Logged In Successfully")   {localStorage.setItem("User",username);
    }
        return data.message;
    }
    catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}

function handleInputErrors(username,password){
    if(!username || !password){
        toast.error('Please enter all details');
        return false;
    }
    return true;
}