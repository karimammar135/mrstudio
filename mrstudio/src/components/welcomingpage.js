import React from "react";
import './welcomingpage.css';
import pool from './pool.png';
import wifi from './wifi.png';
import ac from './ac.png';
import dinner from './dinner.png';

function Hotels2Head(){
    const[showSearchbar, setShowSearchBar] = React.useState(false);

    if (!showSearchbar){
        return (
            <div className="head">
                <span>150 Results</span>
                <div className="actions">
                    <i className="fa-solid fa-pen pen"></i>
                    <i className="fa-solid fa-magnifying-glass search-btn" onClick={() => setShowSearchBar(true)}></i>
                </div>
            </div>
        );
    } else {
        return (
            <div className="head search_bar">
                <input name="hotel_name" placeholder="Search for hotels" id="search_hotels"/>
                <i className="fa-solid fa-xmark close-search" onClick={() => setShowSearchBar(false)}></i>
            </div>
        );
    }
}

export default function WelcomingPage(){

    return (
        <div className="welcoming-page">
            <div className="image">
                <div className="green-overlay">
                    <div className="info">
                        <span className="title">Enjoy Your <br></br> Dream Vacation</span>
                        <span className="loerm">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br>Maxime mollitia, molestiae quas</span>
                        <div className="warwick">
                            <div className="secure-logo">
                                <i className="fa-solid fa-house-lock"></i>
                                <span>Secure</span>
                            </div>
                            <span className="text">Warwick Hotels & Resorts</span>
                        </div>
                    </div>
                </div>
                <div className="informative-table">
                    <div className="facilities">
                        <div className="head">
                            <span>Facilities</span>
                            <a href="#">see more</a>
                        </div>
                        <div className="facilities-options">
                            <div className="swimming">
                                <div>
                                    <img src={pool} alt="pool"></img>
                                </div>
                                <span>swimming</span>
                            </div>
                            <div className="wifi">
                                <div>
                                    <img src={wifi} alt="wifi"></img>
                                </div>
                                <span>Wi-Fi</span>
                            </div>
                            <div className="ac">
                                <div>
                                    <img src={ac} alt="ac"></img>
                                </div>
                                <span>AC</span>
                            </div>
                            <div className="dinner">
                                <div>
                                    <img src={dinner} alt="dinner"></img>
                                </div>
                                <span>Dinner</span>
                            </div>
                        </div>
                    </div>

                    <div className="hotels1">
                        <span className="title">Hotels for you</span>
                        <span className="duration">5 Days 6 Nights</span>
                        <div className="price">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>USD $500.00</span>
                        </div>
                    </div>

                    <div className="hotels2">
                        <Hotels2Head />
                        <div className="elipses">
                            <a href="#" className="elipse1"></a>
                            <a href="#" className="elipse2"></a>
                            <a href="#" className="elipse3"></a>
                            <a href="#" className="elipse4"></a>
                            <a href="#" className="elipse5"></a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}