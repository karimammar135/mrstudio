import React from "react";

import './dash.css';

export default function Dash(){
    return (
        <div className="dash_wrapper">
            <div className="dash_container">
                <h1>Get better work</h1>
                <p>See why millions of people across 195 countries use Dash.</p>
                <div className="email_form">
                    <input type="email" name="dash-email" placeholder="example@gmail.com"></input>
                    <input type="submit" value="Try for free"></input>
                </div>
            </div>
        </div>
    );
}