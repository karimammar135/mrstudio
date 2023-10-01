import React from "react";

export default function HotelLocation(){
    return(
        <div className="map_wrapper">
            <div className="map_container">
                <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48360.34979520232!2d-74.02512353198117!3d40.75054539838492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a4127ca9%3A0xbecdcc9081d6cfdb!2sMidtown%20Manhattan%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2slb!4v1696155042715!5m2!1sen!2slb" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="location">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Midtown Manhattan, New York City, USA</span>
                </div>
            </div>
        </div>
    );
}