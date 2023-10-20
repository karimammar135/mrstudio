import React from "react";

export default function HotelLocation({ hotel }){
    return(
        <div className="map_wrapper">
            <div className="map_container">
                <iframe className="map" src={hotel.location} width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="location">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{hotel.locality}, {hotel.city}, {hotel.country}</span>
                </div>
            </div>
        </div>
    );
}