import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.css";
import logo from "./assests/logo.png";
import Axios from "axios";


export const Login = (props) => {

    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/", { email, password })
      .then(response =>{
        if(response.data.status){Navigate("/home")}
      })
      .catch((e) => {
        console.log(e);
      });
  };

    return (
        <>
        <div className="navRegister">
            <img src={logo} alt="" />
            <h1>Messenger</h1>
        </div>
        <div className="subMain">
            <div className="register-auth-form-container">
                <div className="salutation">
                    <em>Welcome back to Messenger!!</em>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="registerInput">
                        <em>Email</em>
                        <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com"/>
                        <em>Password</em>
                        <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="*"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <span>New to Messenger? <Link to="/register">Register</Link></span>
            </div>
        </div>
        </>
    );
}