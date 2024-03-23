import './mainScreenCSS.css'
import searchIcon from "./assests/searchIcon.png"

export const MainScreen = () =>{
    return(
        <>
            <div className="navMainScreen"></div>
            <div className="subMainScreen">
                <div className="main">
                    <div className="sidebar1">
                        <div className="search">
                            <input type="text" placeholder='Search...'/>
                            <img src={searchIcon} alt="" />
                        </div>
                    </div>
                    <div className="sidebar2"></div>
                </div>
            </div>
        </>
    )
}