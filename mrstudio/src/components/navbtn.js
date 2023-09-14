import React from "react";

import CreateURL from './CreateURL.js';

export default function NavBtn({authenticated, page, flipContent, is_login}){
    if (page === "home"){
        return (
            <>
                {authenticated && <a className="button" href={CreateURL('logout')}>Logout</a> || <a className="button" href={CreateURL('login')}>Login</a>}
            </>
        );
    }
    else if (page === "login"){
        return (
            <a className="button" onClick={() => flipContent()}>{is_login && "Sign up" || "Log in"}</a>
        );
    }
}