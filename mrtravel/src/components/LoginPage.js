import React from "react";

import './loginpage.css';
import Navbar from './navbar.js';
import getCookie from './getCookie.js';

import UpdateURL from './UpdateURL.js';

export default function LoginPage({ is_signup }){
    // State
    const[state, setState] = React.useState({
        login: true,
        signup: false
    });

    // Funtion that Flips between forms
    function flipContent(flipto){
        if (flipto === 'login') {
            setState({
                ...state,
                login: true,
                signup: false
            })
        }
        else {
            setState({
                ...state,
                login: false,
                signup: true
            })
        }
    } 

    // Check which form to display
    React.useEffect(() => {
        if(is_signup){
            console.log('show sign up form');
            flipContent('signup');
        } else {
            console.log('show login from');
            flipContent('login');
        }
    }, [is_signup]);


    // Submit Login / Sign Up forms
    function login_user(event){
        // Prevent default submition
        event.preventDefault();
        
        // If Login Form
        if (state.login) {
            const username = document.querySelector('form #username').value;
            const password = document.querySelector('form #password').value;

            // Get csrf token
            const csrftoken = getCookie('csrftoken');
            // Submit Data to django backend using API
            fetch('/login_user', {
                method: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.message != null){
                    console.log(result.message);
                    window.location.href = "/";
                }
                else {
                    alert(result.error);
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
        } 
        
        // If Sign up Form
        else {
            const username = document.querySelector('form #username').value;
            const email = document.querySelector('form #email').value;
            const password = document.querySelector('form #password').value;
            const confirmation = document.querySelector('form #confirmation').value;

            // Get csrf token
            const csrftoken = getCookie('csrftoken');
            // Submit Data to django backend using API
            fetch('/register', {
                method: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                body: JSON.stringify({
                    username: username,
                    password: password, 
                    email: email,
                    confirmation: confirmation
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.message != null){
                    console.log(result.message);
                    window.location.href = "/";
                }
                else {
                    alert(result.error);
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
        }
    }

    return (
        <div className="login_wrapper_body">
            <Navbar page="login" flipContent={flipContent} is_login={state.login} />
            <div className="login_body">
                <div className="background_triangle_1"></div>
                <div className="background_triangle_2"></div>

                <div className="login_container">
                    <div className="smiley_woman"></div>
                    <div className="login_form">
                        <div className="logo">
                            <i className="fa-solid fa-clipboard-list"></i>
                        </div>
                        <div className="head">
                            <h1>{state.login && "Login" || "Sign up"}</h1>
                            <p>{state.login && "Login with the data you entered during your registration." || "Create your own account for MRtravel."}</p>
                        </div>
                        <form onSubmit={(event) => login_user(event)}>
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" name="username" placeholder="Enter username" autoComplete="true"></input>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="passowrd" placeholder="Enter password"></input>
                            {state.signup && <label htmlFor="email">Email</label>}
                            {state.signup && <input id="email" type="email" name="email" placeholder="Enter email" autoComplete="true"></input>}
                            {state.signup && <label htmlFor="confirmation">Confirm password</label>}
                            {state.signup && <input id="confirmation" type="password" name="confirmation" placeholder="Confirm password"></input>}         
                            <input type="submit" value={state.login && "Log in" || "Sign up"}></input>
                            {state.login && <a href="#">Did you forget your passowrd?</a>}
                        </form>
                        <div className="signup_container">
                            <div className="wrapper">
                                <h1>{state.login && "Sign up" || "Log in"}</h1>
                                <p>{state.login && "Create your own account for MRtravel." || "Login with the data you entered during your registration."}</p>
                                <button onClick={() => UpdateURL(state.login ? 'signup': 'login')}>{state.login && "Create account" || "Log in"}</button>
                            </div>
                        </div>
                        <div className="footer">
                            <div>
                                <a href="#">Cookies</a>
                                <a href="#">Legal policy</a>
                            </div>
                            <a href="#">Copyright 2023</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}