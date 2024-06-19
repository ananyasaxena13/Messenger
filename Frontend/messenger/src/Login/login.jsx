import React, {useState } from "react";
import "./login.css";
import FormImg from "../assests/FormImg.png";
import { Navbar } from "../Navbar/navbar";
import { Link, useNavigate} from "react-router-dom";
import profile_logo from "../assests/profile_logo.jpg";
import lock from "../assests/lock.png";
import {Login} from "../hooks/login.js";


export const LoginScreen = () => {

  const Navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");

    const handleSubmit = async(e) => {
      e.preventDefault();
      const res = await Login(username,password);
      if(res){
        setUsername("");
        setPass("");
      }
      window.location.reload();
    }
  return (
    <div className="Main">
      <Navbar />
      <div className="mainMain">
        <div className="loginMain">
          <img src={FormImg} alt="" />
          <form onSubmit={handleSubmit}>
            <div className="greet">
              <h1>Welcome back to Messenger !!</h1>
              <h3>Login with your Credentials</h3>
            </div>
            <div className="username">
              <div>
                <img src={profile_logo} alt="" />
              </div>
              <input onChange={(e) => setUsername(e.target.value)}   type="text" placeholder="Username" value={username}/>
            </div>
            <div className="password">
                <input  onChange={(e) => setPass(e.target.value)}   type="password" placeholder="Password" value={password}/>
                <div><img src={lock} alt="" /></div>
            </div>
            <button type="submit">login</button>
            <span>Don't have an account? <Link to="/register" className="aTag">Register</Link></span>
          </form>
        </div>
      </div>
    </div>
  );
};
