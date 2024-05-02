import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  about: {type:String,default:""},
  profileImg: { type: Buffer, default: "" },
},{timestamps:true});

const User = mongoose.model("Users", UserSchema);

export default User;