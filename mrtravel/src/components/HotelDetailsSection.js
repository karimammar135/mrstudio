import React from "react";

export default function HotelDetailsSection(){
    return(
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
    );
}