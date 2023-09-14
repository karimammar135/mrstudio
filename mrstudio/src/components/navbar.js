import React from "react";
import './navbar.css';
import NavContent from "./navcontent.js";

// Navbar
export default function Navbar({ page, flipContent, is_login }){
    const[widthdemension, setWidthdemension] = React.useState(window.innerWidth);

    // Debounce functions
    function debounce(fn, delay) {
        let timer;
        return (() => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(), delay);
        })();
        
    };

    // Reset width
    function resetWidth(){
        setWidthdemension(window.innerWidth)
    };

    // on window resize reset the width demension
    window.addEventListener('resize', () => debounce(resetWidth, 600));

    // Return navbar
    return (
        <div className="navbar" id={!(page === "login") ? "" : "login_navbar"}>
            <a href="#" className="title">MRstudio</a>
            <div className="nav-body">
                <NavContent widthdemension={widthdemension} page={page} flipContent={flipContent} is_login={is_login}/>
            </div>
        </div>
    );

}

