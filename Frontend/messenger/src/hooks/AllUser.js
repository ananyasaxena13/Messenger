
export const AllUser = async(username) => {
    try{
        const res =  await fetch(`http://localhost:4000/${username}/allUser`);
        const data = await res.json();
        return data;
    }
    catch(e){
        console.log(e);
    }
}