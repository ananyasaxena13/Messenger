import React, { useState } from "react";
import { Navbar } from "../Navbar/navbar";
import FormImg1 from "../assests/FormImg1.png";
import "./register.css";
import profile_logo from "../assests/profile_logo.jpg";
import lock from "../assests/lock.png";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../hooks/signup";

export const RegisterScreen = () => {

  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const handleSubmit =async(e) => {
    e.preventDefault();
    const res = await Signup(fullname,username,password,confirmPassword);
    if(res){
      setUsername("");
      setFullname("");
      setPass("");
      setConfirmPass("");
      Navigate("/login");
    }
  }

  return (
    <div className="Main">
      <Navbar />
      <div className="mainMain">
        <div className="registerMain">
          <img src={FormImg1} alt="" />
          <form onSubmit={handleSubmit}>
            <div class="greet">
              <h1>Say Hii to World !!</h1>
              <h3>With Messenger</h3>
            </div>
            <div className="username">
              <div>
                <img src={profile_logo} alt="" />
              </div>
              <input onChange={(e) => setUsername(e.target.value)}   type="text" placeholder="Username"/>
            </div>
            <div className="password">
                <input  onChange={(e) => setFullname(e.target.value)}   type="text" placeholder="Fullname" />
                <div><img src={profile_logo} alt="" /></div>
            </div>
            <div className="username">
              <div>
                <img src={lock} alt="" />
              </div>
              <input onChange={(e) => setPass(e.target.value)}   type="password" placeholder="Password"/>
            </div>
            <div className="password">
                <input  onChange={(e) => setConfirmPass(e.target.value)}   type="password" placeholder="Confirm Password" />
                <div><img src={lock} alt="" /></div>
            </div>
            <button type="submit" id="registerbtn">Register</button>
            <span>Already have an account? <Link to="/login " className="aTag">Login</Link></span>
          </form>
        </div>
      </div>
    </div>
  );
};
