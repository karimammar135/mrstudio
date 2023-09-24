import React from "react";

import './footer.css';

export default function Footer(){
    return (
        <div className="footer_wrapper">
            <div className="footer_container">
                <div className="footer_content">
                    <div className="mrtravel">
                        <div className="line1"></div>
                        <h1>MRtravel</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia</p>
                        <ul className="social_media">
                            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="#"><span>in</span></a></li>
                        </ul>
                    </div>
                    <ul className="links">
                        <h1>Links</h1>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Price</a></li>
                        <li><a href="#">Download</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Service</a></li>
                    </ul>
                    <ul className='links support'>
                        <h1>Support</h1>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">How it</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Reporting</a></li>
                    </ul>
                        
                    <ul className='links'>
                        <h1>Contact Us</h1>
                        <li><a href="#">+961573122</a></li>
                        <li><a href="#">ka3588828@gmail.com</a></li>
                        <li><a href="#">Karim Ammar</a></li>
                    </ul>
                </div>
                <div className="footer_bottom">
                    <div className="line2"></div>
                    <div className="bottom_content">
                        <span className="bottom_1">Copyright & Design by @MRtravel</span>
                        <div className="bottom_2">
                            <span>Terms of use</span>
                            <div className="break_bar"></div>
                            <span>Privacy Policy</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}