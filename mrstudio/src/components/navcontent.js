import React from "react";
import DropContent from './dropcontent.js';

// Nav Content Component
export default function NavContent({ widthdemension }){
    const[dropdown, setDropdown] = React.useState(false)
    console.log(dropdown);

    window.onclick = (event) => {
        if (dropdown === true){
            if (!event.target.matches('.dropbtn') && !event.target.matches('#navDropdown a')){
                setDropdown(false)
            }
        }
    };

    // if window width is less than 710px plug a dropdown menu
    if (widthdemension <= 710){
        return (
            <div className="dropdown">
                <i onClick={() => setDropdown(!(dropdown))} className="fa-solid fa-bars dropbtn"></i>
                <DropContent dropdown={dropdown} />
            </div>
        );
    }
    // Else return nav-items
    else {
        return (
            <>
                <div className="nav-items">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Type of house</a>
                    <a href="#">Contact</a>
                </div>
                <button>Login</button>
            </>
        );
    }
}