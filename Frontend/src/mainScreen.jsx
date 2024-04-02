import './mainScreenCSS.css'
import React from 'react';
import logo from "./assests/logo.png";
import settings from "./assests/settings.png" 


export const MainScreen = () =>{
    return(
        <>
        <div className="main">
            <div className="section1">
                <div className="searchBox">
                    <div className="search"><input type="text" placeholder='🔍Search...'/></div>
                </div>
                <div className="chatsBox"></div>
            </div>
            <div className="section2"></div>
        </div>
        <div className="tabMain">
            <div className='logoInfo'>
                <img src={logo} alt="" />
                <h1>Messenger</h1>
            </div>
            <div className="settingDiv"><img src={settings} alt="" /></div>
        </div>
        </>
    )
}