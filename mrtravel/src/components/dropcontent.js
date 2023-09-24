import React from "react";

export default function NavContent({ dropdown }){
    if (dropdown){
        return (
            <div id="navDropdown" className="dropdown-content">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Type of house</a>
                <a href="#">Contact</a>
                <a href="#">Logout</a>
            </div>
        );
    } else {
        return (<></>);
    }
}