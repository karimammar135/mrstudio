import React from "react";

import './hoteldetails.css';
import Navbar from "./navbar.js";
import HotelDetailsSection from "./HotelDetailsSection.js";
import HotelLocation from "./HotelLocation.js";
import VideoSection from "./VideoSection.js";
import PaymentDetails from './PaymentDetails.js';
import Footer from './Footer.js';

export default function HotelDetails({ path }){
    const[hotel_id, setHotel_id] = React.useState(path.split(/\//)[2]);
    const[hotel, setHotel] = React.useState(null);
    const[rooms, setRooms] = React.useState(null);
    const[room_selected, setRoom_selected] = React.useState({id: null, size: null, price_per_day: null, discount: null, discount_type: null});

    // Fetch hotel info
    React.useEffect(() => {
        fetch(`/hotel_info${hotel_id}`)
        .then(response => response.json())
        .then(data => {
            setHotel(data.hotel)
            setRooms(data.rooms)
        })
        .catch(error => {
            alert(error)
        });
    }, []);

    // Set selected room
    React.useEffect(() => {
        if (rooms != null){
            setRoom_selected(rooms[0])
        }
    }, [rooms])

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

    // Making sure hotel isn't null
    if(hotel === null | rooms === null){
        return <></>;
    }
    else {
        return (
            <div className="hotel_page_wrapper">
                <section className="main_section" style={{ backgroundImage: `url(${hotel.picture_url})` }}>
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
                    <HotelDetailsSection hotel={hotel} rooms={rooms} room_selected={room_selected} setRoom_selected={setRoom_selected} />
                    <HotelLocation hotel={hotel} />
                    <VideoSection page="hotel_page" hotel={hotel} />
                    <PaymentDetails hotel={hotel} rooms={rooms} room_selected={room_selected} setRoom_selected={setRoom_selected} />
                    <Footer />
                </section>

            </div>
        );
    }
}