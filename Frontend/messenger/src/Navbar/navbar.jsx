import React from "react";
import "./navbar.css";
import l1 from "../assests/l1.png";


export const Navbar = () =>{
    return(
        <div className="navMain">
            <div className="navLogo">
                <img src={l1} alt="" />
                <h2>Messenger</h2>
            </div>
        </div>
    )
}