import React from "react";

export default function HotelDetailsSection({ hotel, rooms, room_selected, setRoom_selected }){
    return(
        <div className="details_section_wrapper">
            <div className="details_section">
                <div className="details_container">
                    <div className="header">
                        <h1>{hotel.name}</h1>
                        <div>
                            <span>4.7</span>
                            <i className="fa-solid fa-star"></i>
                            <span>(Dummy)</span>
                        </div>
                    </div>
                    <ul>
                        <li>Check in: {hotel.check_in}</li>
                        <li>Check out: {hotel.check_out}</li>
                        <li>Locality: {hotel.locality}</li>
                        <li>City: {hotel.city}</li>
                        <li>Country: {hotel.country}</li>
                    </ul>
                    <div className="room_size">
                        <span>Room size: {room_selected.size}ft2</span>
                        <div className="select_wrapper">
                            <select name="change_size" onChange={(event) => setRoom_selected(JSON.parse(event.target.value))}>
                                <option disabled defaultValue>Change size</option>
                                {rooms.map(room => {
                                    return <option key={room.id} value={JSON.stringify(room)}>{room.size}ft2</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="blue-background"></div>
            </div>
        </div>
    );
}