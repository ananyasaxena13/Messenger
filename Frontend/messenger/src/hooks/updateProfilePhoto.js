import toast from "react-hot-toast"


export const UploadProfilePhoto = async(username , formData) =>{
    try{
        const res = await fetch(`http://localhost:4000/${username}/updateProfilePhoto`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: formData
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