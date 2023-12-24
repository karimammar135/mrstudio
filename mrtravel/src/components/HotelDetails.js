import React from "react";

import './hoteldetails.css';
import Navbar from "./navbar.js";
import HotelDetailsSection from "./HotelDetailsSection.js";
import HotelLocation from "./HotelLocation.js";
import VideoSection from "./VideoSection.js";
import PaymentDetails from './PaymentDetails.js';
import Footer from './Footer.js';
import UpdateURL from "./UpdateURL.js";
import getCookie from './getCookie.js';
import SearchBox from './SearchBox.js';

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
    function showPaymentPage(duration, total_price, survey_date, survey_end_date, payment){
        setPaymentObject({
            ...paymentObject,
            hotel_name: hotel.name,
            picture_url: hotel.picture_url,
            total_price: total_price,
            mrtravel_hyphin: hotel.mrtravel_hyphin,
            direct_payment_discount: hotel.direct_payment_discount,
            duration: duration,
            survey_date: survey_date,
            survey_end_date: survey_end_date,
            room_selected: room_selected,
            hotel: hotel,
            payment: payment,
            type: 'direct',
        })
        UpdateURL(`hotel/${hotel_id}/payment`);
    }
    // Send Api Request to save rent with uncomplted payment
    function rentRoomUncompletedPayment(duration, total_price, survey_date, survey_end_date, payment){
        // Get csrf token
        const csrftoken = getCookie('csrftoken');
        // Fetch the data to the data base to rent a room
        fetch('/rent_room', {
            method: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            body: JSON.stringify({
                payment_details: {
                    total_price: total_price,
                    duration: duration,
                    survey_date: survey_date,
                    survey_end_date: survey_end_date,
                    room_selected: room_selected,
                    payment: payment,
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message != null){
                window.location.href = '/account';
            } else {
                alert(result.error)
            }
        })
        .catch(error => {
            alert(error)
        });
        
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
                        <SearchBox />
                    </div>
                </section>

                <section className="empty-space"></section>

                <Navbar page="hotel_page" is_login={null} />

                <section className="body">
                    <HotelDetailsSection hotel={hotel} rooms={rooms} room_selected={room_selected} setRoom_selected={setRoom_selected} />
                    <HotelLocation hotel={hotel} />
                    <VideoSection page="hotel_page" hotel={hotel} />
                    <PaymentDetails authenticated={authenticated} hotel={hotel} rooms={rooms} room_selected={room_selected} setRoom_selected={setRoom_selected} showPaymentPage={showPaymentPage} rentRoomUncompletedPayment={rentRoomUncompletedPayment}/>
                    <Footer />
                </section>

            </div>
        );
    }
}