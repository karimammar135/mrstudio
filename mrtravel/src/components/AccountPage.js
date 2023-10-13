import React from "react";

import './accountpage.css';
import UpdateURL from "./UpdateURL.js";
import profile from './images/profile_icon.png';
import Footer from './Footer.js';

export default function AccountPage(){
    // State for user info
    const[userInfo, setUserInfo] = React.useState({id: null, username: null, email: null, hotelier: null})

    // Fetch User Info
    React.useEffect(() => {
        fetch('/user_info')
        .then(response => response.json())
        .then(data => {
            if(data.error != null){
                console.log(data.error)
                location.replace('/login');
            }
            else{
                setUserInfo(data)
            }
        })
        .catch(error => {
            alert(error)
        })
    }, []);

    // Return Html
    return (
        <section className="account_page">
            <div className="top_section">
                <i className="fa-solid fa-chevron-left back_icon" onClick={() => UpdateURL('')}></i>
                <div className="profile_info">
                    <div className="img_wrapper">
                        <img src={profile} alt="profile icon"></img>
                    </div>
                    <ul className="info">
                        <li id={(userInfo.hotelier === false) ? "hide": ""}>
                            <i className="fa-solid fa-certificate verified">
                                <i className="fa-solid fa-check check"></i>
                            </i>
                            <span>hostelier</span>
                        </li>
                        <li>
                            <div>
                                <span className="username">{userInfo.username}</span>
                                <span className="email">{userInfo.email}</span>
                            </div>
                            {(userInfo.hotelier === true) && <button onClick={() => UpdateURL('add_hotel')}>Add Your Hotel</button>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className={(userInfo.hotelier === true) ? "white_space_hotelier": "white_space_regular"}></div>

            <div className="account_details_wrapper">
                <div className="account_details">
                    <h1>Account Details:</h1>
                    <ul>
                        <li>Account type: {(userInfo.hotelier === true) && 'hotelier' || 'customer'}</li>
                        <li>Email: {userInfo.email}</li>
                        <li>Username: {userInfo.username}</li>
                        <li>Hotel rooms rented : 1</li>
                        <li>Uncompleted payments: 1</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </section>
    );
}