import toast from "react-hot-toast";

export const Logout = async() =>{
    try{
        const res = await fetch("http://localhost:4000/logout",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
        })
        const data = await res.json();
        localStorage.removeItem("User");
        toast.success(`${data.message}`);
    }catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}