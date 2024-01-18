import React, { useEffect } from "react";

import DropContent from './dropcontent.js';
import NavBtn from './navbtn.js';
import UpdateURL from "./UpdateURL.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { dotWave } from 'ldrs'

dotWave.register()

// Nav Content Component
export default function NavContent({ widthdemension, page, is_login, isloading, setIsloading }){
    const[dropdown, setDropdown] = React.useState(false);
    const[authenticated, setAuthenticated] = React.useState(false);
    const[islogingout, setIslogingout] = React.useState(false);

    window.onclick = (event) => {
        if (dropdown === true){
            if (!event.target.matches('.dropbtn') && !event.target.matches('#navDropdown a')){
                setDropdown(false)
            }
        }
    };

    // Check if user is authenticated
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/authentication');
            const data = await response.json();
            setAuthenticated(data.authenticated)
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Logout user
    function logout_user(){
        setIslogingout(true)
        fetch('/logout')
        .then(response => response.json())
        .then(data => {
            console.log(data["message"])
            setIslogingout(false);
            setAuthenticated(false);
            location.href = "/";
        })
        .catch(error => {
            alert(error)
        })
    }

    // if window width is less than 710px plug a dropdown menu
    if (widthdemension <= 710){
        return (
            <div className="dropdown">
                <i onClick={() => setDropdown(!(dropdown))} className={dropdown ? "fa-solid fa-bars dropbtn dropbtn-focus": "fa-solid fa-bars dropbtn"}></i>
                <DropContent dropdown={dropdown} page={page} authenticated={authenticated} is_login={is_login} logout_user={logout_user} isloading={isloading}/>
            </div>
        );
    }

    // Else return nav-items
    else {
        return (
            <>  
                <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                    <div className="nav-items">
                        <a href="/" className="item">Home</a>
                        <a href="#" className="item">About</a>
                        <a className="item" onClick={() => {if(authenticated){UpdateURL('account')} else{UpdateURL('login')}}}>Account</a>
                        <a href="#" className="item">Contact</a>
                    </div>

                    <NavBtn page={page} authenticated={authenticated} is_login={is_login} logout_user={logout_user} isloading={isloading} islogingout={islogingout}/>
                </SkeletonTheme>
            </>
        );
    }
}