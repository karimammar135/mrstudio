import React from "react";
import './RelaxingPleasure.css';

import UpdateURL from './UpdateURL.js';
import SkeletonCard from "./SkeletonCard.js";
import { SkeletonTheme } from "react-loading-skeleton";

export default function RelaxingPleasure(){
    const[hotels, setHotels] = React.useState(null);

    // Fetch hotels info
    React.useEffect(() => {
        fetch('/hotels/limit3')
        .then(response => response.json())
        .then(data => {
            setHotels(data);
        })
        .catch(error => {
            alert(error)
        })
    }, []);

    // Show Hotel Details
    function showDetails(hotel_num){
        UpdateURL(`hotel/${hotel_num}`);
    }

    document.addEventListener('DOMContentLoaded', () => {
        let scrollbar = document.querySelector('.images-scrollbar');
        scrollbar.scrollLeft = ((scrollbar.scrollWidth - scrollbar.clientWidth - 49) / 2);
    });

    return ( 
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className="center-relaxing-pleasure">
            <div className="relaxing-pleasure-container">
                <div className="images-regular images-defaults">
                    {(hotels != null) && hotels.map((hotel, index) => {
                        return <div key={hotel.id} className={"card " + `card-${index + 1}`} style={{ backgroundImage: `url('${hotel.picture_url}')` }}>
                            <div className="details">
                                <div className="header">
                                    <span className="resort-name">{(hotel.name.length >= 23) && (hotel.name.substring(0, 21) + " ...") || hotel.name}</span>
                                    <div className="rating">
                                        <i className="fa-regular fa-heart"></i>
                                        <span>4.7</span>
                                    </div>
                                </div>
                                <div className="bar"></div>
                                <a className="view-details" onClick={() => showDetails(hotel.id)}>View Details</a>
                            </div>
                        </div>
                    }) || <SkeletonCard cards={3}/>}
                </div>
                <div className="details">
                    <span className="header">Welcome to MRtravel Resort</span>
                    <span className="title">Relaxing Pleasure</span>
                    <span className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Maxime mollitia, molestiae quas vel sint commodi repudia
                        ndae consequuntur voluptatum laborum numquam blanditiis 
                        harum quisquam eius.
                    </span>
                </div>
            </div>
            <div className="images-scrollbar images-defaults">
                    {(hotels != null) && hotels.map((hotel, index) => {
                        return <div key={hotel.id} className={"card " + `card-${index + 1}`} style={{ backgroundImage: `url('${hotel.picture_url}')` }}>
                            <div className="details">
                                <div className="header">
                                    <span className="resort-name">{(hotel.name.length >= 23) && (hotel.name.substring(0, 21) + " ...") || hotel.name}</span>
                                    <div className="rating">
                                        <i className="fa-regular fa-heart"></i>
                                        <span>4.7</span>
                                    </div>
                                </div>
                                <div className="bar"></div>
                                <a className="view-details" onClick={() => showDetails(hotel.id)}>View Details</a>
                            </div>
                        </div>
                    }) || <SkeletonCard cards={3}/>}
            </div>
        </div>
        </SkeletonTheme>
    );
}