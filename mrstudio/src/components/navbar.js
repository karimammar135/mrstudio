import React from "react";
import './navbar.css';

// Navbar
export default function Navbar(){
    const[widthdemension, setWidthdemension] = React.useState(0);

    // if window size is less than 710px plug a 
    

    return (
        <div className="navbar">
            <a href="#" className="title">MRstudio</a>
            <div className="nav-body">
                <div className="nav-items">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Type of house</a>
                    <a href="#">Contact</a>
                </div>
                <button>Login</button>
            </div>
        </div>
    );
}

