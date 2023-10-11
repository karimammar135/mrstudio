import React from "react";

import './hoteldetails.css';
import Navbar from "./navbar.js";
import HotelDetailsSection from "./HotelDetailsSection.js";
import HotelLocation from "./HotelLocation.js";
import VideoSection from "./VideoSection.js";
import PaymentDetails from './PaymentDetails.js';
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
        if (window.scrollY >= 100){
            document.querySelector('.navbar').classList.add('navbar_scrolled');
        }
        if (window.scrollY < 100){
            document.querySelector('.navbar').classList.remove('navbar_scrolled');
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
                <HotelDetailsSection />
                <HotelLocation />
                <VideoSection page="hotel_page" img_path='./images/4-hotel.jpg' />
                <PaymentDetails />
                <Footer />
            </section>

        </div>
    );
}