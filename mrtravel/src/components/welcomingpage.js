import React from "react";
import './welcomingpage.css';
import pool from './images/pool.png';
import wifi from './images/wifi.png';
import ac from './images/ac.png';
import dinner from './images/dinner.png';
import UpdateURL from "./UpdateURL.js";

import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

import SkeletonElipses from './SkeletonElipses.js';
import { SkeletonTheme } from 'react-loading-skeleton';

function Hotels2Head(){
    const[showSearchbar, setShowSearchBar] = React.useState(false);
    const[total_hotels, setTotal_hotels] = React.useState(0);
    const[hotels, setHotels] = React.useState();
    const[results, setResults] = React.useState([]);
    const[input, setInput] = React.useState("");

    // Calculate Number of Hotels
    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/hotels/limit-1');
            const data = await response.json();
            setTotal_hotels(data.length)
            setHotels(data)
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!showSearchbar){
        return (
            <div className="head">
                <span>{total_hotels} Results</span>
                <div className="actions">
                    <i className="fa-solid fa-pen pen"></i>
                    <i className="fa-solid fa-magnifying-glass search-btn" onClick={() => setShowSearchBar(true)}></i>
                </div>
            </div>
        );
    } else {
        return <div className="search-container">
            <SearchBar input={input} setInput={setInput} setShowSearchBar={setShowSearchBar} hotels={hotels} setResults={setResults} results={results} page="main_page"/>
            <SearchResults setInput={setInput} results={results} />
        </div>
    }
}

export default function WelcomingPage(){
    const[hotels, setHotels] = React.useState(null);

    // Fetch hotels info
    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/hotels/limit5');
            const data = await response.json();
            setHotels(data)
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Show Hotel Details
    function showDetails(hotel_num){
        UpdateURL(`hotel/${hotel_num}`);
    }

    return (
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
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
                            {(hotels != null) && hotels.map(hotel => {
                                return <a key={hotel.id} className="elipse" onClick={() => showDetails(hotel.id)} href="#" style={{backgroundImage: `url(${hotel.picture_url})`}}></a>
                            }) || <SkeletonElipses elipses={5} />}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </SkeletonTheme>
    );
}