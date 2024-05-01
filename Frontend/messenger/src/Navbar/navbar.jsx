import React from "react";
import "./navbar.css";
import logo from "../assests/logo.png";

export const Navbar = () =>{
    return(
        <div className="navMain">
            <div className="navLogo">
                <img src={logo} alt="" />
                <h2>Messenger</h2>
            </div>
        </div>
    )
}