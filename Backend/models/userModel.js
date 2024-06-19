import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: {type:String},
  profilePhoto: { type:String},
},{timestamps:true});

const User = mongoose.model("Users", UserSchema);

export default User;
