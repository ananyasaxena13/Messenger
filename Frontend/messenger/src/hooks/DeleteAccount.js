import toast from "react-hot-toast"

export const DeleteAccount = async(username) =>{
    try{
        const res = await fetch(`http://localhost:4000/${username}/delete`,{
            method: "POST",
        });
        const data = await res.json();
        toast.success(`${data.message}`);
        return data.message;
    }
    catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}