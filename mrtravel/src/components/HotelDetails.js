import React from "react";

import './hoteldetails.css';
import Navbar from "./navbar.js";
import Footer from './Footer.js';

export default function HotelDetails({ path }){
    const[hotel_num, setHotel_num] = React.useState(path.slice(0, 7).replace(path.slice(0, 6), ''));

    // DEBOUNCE function
    function debounce(fn, delay) {
        let timer = null
      
        return (...args) => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => fn(...args), delay)
        }
    }

    // On scroll change navabr background
    window.addEventListener('scroll', debounce((event) => {
        console.log(window.screenY);
        if (window.scrollY >= 100){
            console.log('scrolled');
            document.querySelector('.navbar').classList.add('navbar_scrolled');
            console.log(document.querySelector('.navbar'));
        }
        if (window.scrollY < 100){
            document.querySelector('.navbar').classList.remove('navbar_scrolled');
            console.log('stop');
        }
    }, 200));

    return (
        <div className="hotel_page_wrapper">
            <section className="main_section">
                <div className="overlay">
                    <div className="search_bar">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Serch for other hotels"></input>
                        <i className="fa-solid fa-hotel"></i>
                    </div>
                </div>
            </section>

            <section className="empty-space"></section>

            <Navbar page="hotel_page" is_login={null} />

            <section className="body">
                <div className="details_section_wrapper">
                    <div className="details_section">
                        <div className="details_container">
                            <div className="header">
                                <h1>Sheraton New York</h1>
                                <div>
                                    <span>4.7</span>
                                    <i className="fa-solid fa-star"></i>
                                    <span>(Dummy)</span>
                                </div>
                            </div>
                            <ul>
                                <li>Check in: 12pm</li>
                                <li>Check out: 2pm</li>
                                <li>Locality: Midtown Manhattan</li>
                                <li>City: New York</li>
                                <li>Country: USA</li>
                            </ul>
                            <div className="room_size">
                                <span>Room size: 150ft2</span>
                                <div className="select_wrapper">
                                    <select name="change_size">
                                        <option defaultValue>Change size</option>
                                        <option value="100">150ft2</option>
                                        <option value="200">150ft2</option>
                                        <option value="250">150ft2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="blue-background"></div>
                    </div>
                </div>
            </section>

        </div>
    );
}