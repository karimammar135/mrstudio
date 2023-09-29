import React from "react";

import UpdateURL from './UpdateURL.js';

export default function NavBtn({ authenticated, page, is_login, logout_user }){

    if (page === "home" | page === "hotel_page"){
        return (
            <>
                {authenticated && <a className="button" onClick={() => logout_user()}>Logout</a> || <a className="button" onClick={() => {UpdateURL('login')}}>Login</a>}
            </>
        );
    }
    else if (page === "login"){
        return (
            <a className="button" onClick={() => UpdateURL(is_login ? 'signup': 'login')}>{is_login && "Sign up" || "Log in"}</a>
        );
    }
}