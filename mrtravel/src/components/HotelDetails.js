import React from "react";

import './hoteldetails.css';
import Navbar from "./navbar.js";
import HotelDetailsSection from "./HotelDetailsSection.js";
import HotelLocation from "./HotelLocation.js";
import VideoSection from "./VideoSection.js";
import PaymentDetails from './PaymentDetails.js';
import Footer from './Footer.js';
import UpdateURL from "./UpdateURL.js";

export default function HotelDetails({ path, paymentObject, setPaymentObject, authenticated }){
    const[hotel_id, setHotel_id] = React.useState(path.split(/\//)[2]);
    const[hotel, setHotel] = React.useState(null);
    const[rooms, setRooms] = React.useState(null);
    const[room_selected, setRoom_selected] = React.useState({id: null, size: null, price_per_day: null, discount: null, discount_type: null, amount: 0, available_rooms: 0});

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
    }, [rooms]);

    // On scroll change navabr background
    React.useEffect(() => {
        // DEBOUNCE function
        function debounce(fn, delay) {
            let timer = null
        
            return (...args) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
            }
        }
        let handleScroll = debounce(() => {
            if (window.scrollY >= 100){
                document.querySelector('.navbar').classList.add('navbar_scrolled');
            }
            if (window.scrollY < 100){
                document.querySelector('.navbar').classList.remove('navbar_scrolled');
            }
        }, 200);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log('✅ Event listener removed');
        }
    }, []);

    // Show payment page function
    function showPaymentPage(duration, total_price, survey_date){
        setPaymentObject({
            ...paymentObject,
            hotel_name: hotel.name,
            picture_url: hotel.picture_url,
            total_price: total_price,
            mrtravel_hyphin: hotel.mrtravel_hyphin,
            direct_payment_discount: hotel.direct_payment_discount,
            duration: duration,
            survey_date: survey_date,
            room_selected: room_selected,
            hotel: hotel,
        })
        UpdateURL(`hotel/${hotel_id}/payment`);
    }

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
                    <PaymentDetails authenticated={authenticated} hotel={hotel} rooms={rooms} room_selected={room_selected} setRoom_selected={setRoom_selected} showPaymentPage={showPaymentPage} />
                    <Footer />
                </section>

            </div>
        );
    }
}