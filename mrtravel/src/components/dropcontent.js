import React from "react";

import UpdateURL from './UpdateURL.js';

export default function NavContent({ dropdown, authenticated, page, is_login, logout_user }){
    if (dropdown){
        if (page === "login"){
            return (
                <div id="navDropdown" className="dropdown-content">
                    <a onClick={() => UpdateURL('')}>Home</a>
                    <a href="#">About</a>
                    <a onClick={() => UpdateURL('account')}>Account</a>
                    <a href="#">Contact</a>
                    <a onClick={() => UpdateURL(is_login ? 'signup': 'login')}>{is_login && "Sign up" || "Log in"}</a>
                </div>
            );
        }
        else {
            return (
                <div id="navDropdown" className="dropdown-content">
                    <a onClick={() => {UpdateURL('')}}>Home</a>
                    <a href="#">About</a>
                    <a onClick={() => UpdateURL('account')}>Account</a>
                    <a href="#">Contact</a>
                    {authenticated && <a onClick={() => logout_user()}>Logout</a> || <a onClick={() => {UpdateURL('login')}}>Login</a>}
                </div>
            );
        }
    } else {
        return (<></>);
    }
}