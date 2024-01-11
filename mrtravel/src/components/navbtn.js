import React from "react";

import UpdateURL from './UpdateURL.js';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { leapfrog } from 'ldrs'

leapfrog.register()

export default function NavBtn({ authenticated, page, is_login, logout_user, isloading }){

    if (isloading) {
        return <SkeletonTheme baseColor="#313131" highlightColor="#525252"><a className="button" ><l-leapfrog
        size="20"
        speed="2.5" 
        color="black" 
      ></l-leapfrog></a></SkeletonTheme> 
    }

    else if (page != "login"){
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