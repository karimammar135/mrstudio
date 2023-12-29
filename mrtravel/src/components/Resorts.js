import React from "react";
import './resorts.css';

import UpdateURL from './UpdateURL.js';

export default function Resorts(){
    const[hotels, setHotels] = React.useState(null);

    // Fetch hotels from backend using API
    React.useEffect(() => {
        fetch('/hotels/limit-1')
        .then(response => response.json())
        .then(data => {
            setHotels(data)
        })
        .catch(error => {
            alert(error)
        })
    }, []);

    // Swipe carousel
    function swipe_carousel(direction){
        const carousel = document.querySelector('.carousel');
        const firstCardWidth = document.querySelector('.card1').offsetWidth;

        carousel.scrollLeft += direction === "left" ? -firstCardWidth : firstCardWidth;
    }

    // Show Hotel Details
    function showDetails(hotel_num){
        UpdateURL(`hotel/${hotel_num}`);
    }
    
    // Return the html content
    return (
        <div className="resorts-container">
            <span className="title">Entire City Of Choice</span>
            <div className="hotels-choices">
                <div className="carousel-wrapper">
                    <i id="left" className="fa-solid fa-circle-chevron-left arrow" onClick={() => swipe_carousel("left")}></i>
                    <ul className="carousel">
                        {(hotels != null) && hotels.map(hotel => {
                            return (
                                <li className="card card1" key={hotel.id} onClick={() => showDetails(hotel.id)}>
                                    <div className="hotel-img" style={{ backgroundImage: `url('${hotel.picture_url}')` }}>
                                        <div className="info">
                                            <span>{hotel.name}</span>
                                            <div className="add-hotel">
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body">
                                        <div className="details">
                                            <span className="price">${hotel.room.price_per_day}.00</span>
                                            <span className="booking-id">Booking ID: 7595364</span>
                                            <span className="country">{hotel.country}</span>
                                        </div>
                                        <div className="secure-logo">
                                            <i className="fa-solid fa-house-lock"></i>
                                            <span>Secure</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <i id="right" className="fa-solid fa-circle-chevron-right arrow" onClick={() => swipe_carousel("right")}></i>
                </div>
                <div className="blue-background"></div>
            </div>
        </div>
    )
}