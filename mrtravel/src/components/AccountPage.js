import React from "react";

import './accountpage.css';
import UpdateURL from "./UpdateURL.js";
import profile from './images/profile_icon.png';
import Footer from './Footer.js';
import classNames from 'classnames';
import ChartBox from './ChartBox.js';

export default function AccountPage({setPaymentObject}){
    // State for user info
    const[userInfo, setUserInfo] = React.useState({id: null, username: null, email: null, hotelier: null, hotel: false, rooms_rented: [], hotel_rooms: []})
    const[uncompleted_payments, setUncompleted_payments] = React.useState(0);

    // Fetch User Info
    React.useEffect(() => {
        fetch('/user_info')
        .then(response => response.json())
        .then(data => {
            if(data.error != null){
                location.replace('/login');
            }
            else{
                setUserInfo({
                    ...data.user_info,
                    hotel: data.hotel,
                    rooms_rented: data.rooms_rented,
                    hotel_rooms: data.hotel_rooms
                })
                // Calculate uncompleted payments
                for(let i = 0; i < (data.rooms_rented).length; i++){
                    if ((data.rooms_rented[i]).payment === false){
                        setUncompleted_payments(parseInt(uncompleted_payments + 1))
                    }
                }
            }
        })
        .catch(error => {
            alert(error)
        })
    }, []);
    
    // Show payment details on arrow click
    function showPaymentDetails(event){
        parent = event.target.parentNode.parentNode;
        parent.querySelector('.payment_details').style.display = 'flex';
        parent.querySelector('.arrow_up').style.display = 'block';
        parent.querySelector('.arrow_down').style.display = 'none';
    }
    // Hide payment details on arrow click
    function hidePaymentDetails(event){
        parent = event.target.parentNode.parentNode;
        parent.querySelector('.payment_details').style.display = 'none';
        parent.querySelector('.arrow_up').style.display = 'none';
        parent.querySelector('.arrow_down').style.display = 'block';
    }

    // Complete payment
    function completePayment(room){
        setPaymentObject({
            ...room,
            type: 'indirect',
        })
        UpdateURL('payment');
    }

    // Edit hotel details
    function editHotel(hotel_id){
        console.log(hotel_id)
        // Redirect the user to a page to edit hotel details
        window.location.href = `/edit_hotel/${hotel_id}`;
    }

    // Delete rent
    function deleteRent(rent_id){
        if(!confirm("Are you sure you want to delete this rent?") ){
            return false;
        } else { 
            // Fetch rent id to be deleted
            fetch(`/delete_rent${rent_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.error != null){
                    alert(data.error)
                } else {
                    console.log(data.message)
                    window.location.href = '/account';
                }
            })
            .catch(error => {
                alert(error)
            })
        }
    }
    
    // Return Html
    return (
        <section className="account_page">
            <div className="top_section">
                <i className="fa-solid fa-chevron-left back_icon" onClick={() => UpdateURL('')}></i>
                <div className="profile_info">
                    <div className="img_wrapper">
                        <img src={profile} alt="profile icon"></img>
                    </div>
                    <ul className="info">
                        <li id={(userInfo.hotelier === false) ? "hide": ""}>
                            <i className="fa-solid fa-certificate verified">
                                <i className="fa-solid fa-check check"></i>
                            </i>
                            <span>hotelier</span>
                        </li>
                        <li>
                            <div>
                                <span className="username">{userInfo.username}</span>
                                <span className="email">{userInfo.email}</span>
                            </div>
                            {(userInfo.hotelier === true) && ((userInfo.hotel === false) && <button onClick={() => UpdateURL('add_hotel')}>Add Your Hotel</button> || <button onClick={() => editHotel(userInfo.hotel.id)} >Edit Your Hotel</button>) || <></>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className={(userInfo.hotelier === true) ? "white_space_hotelier": "white_space_regular"}></div>

            <div className="account_details_wrapper">
                <div className="account_details">
                    <h1>Account Details:</h1>
                    <ul>
                        <li>Account type: {(userInfo.hotelier === true) && 'hotelier' || 'customer'}</li>
                        {(userInfo.hotelier === true) && <li>Hotel name: {userInfo.hotel.name}</li>}
                        <li>Email: {userInfo.email}</li>
                        <li>Username: {userInfo.username}</li>
                        <li>Hotel rooms rented : {Object.keys(userInfo.rooms_rented).length}</li>
                        <li>Uncompleted payments: {uncompleted_payments}</li>
                    </ul>
                </div>
            </div>

            <section className="hotels_rented_wrapper">
                <div className="rooms_rented_details">
                    <h1>{(userInfo.hotelier === true) && 'Pending surveys' || 'Hotels Rented'}</h1>
                    <div className="table_wrapper">
                        <table>
                            <colgroup>
                                <col span="1" className={classNames('', {'col_w200': (userInfo.hotelier === false), 'col_w160': (userInfo.hotelier === true)})}></col>
                                <col span="1"></col>
                                <col span="1"></col>
                                <col span="1"></col>
                                <col span="1"></col>
                                <col span="1"></col>
                                <col span="1"></col>
                            </colgroup>
                            
                            <thead>
                                {(userInfo.hotelier === false) &&
                                <tr className="header_row">
                                    <th>Hotel name</th>
                                    <th className="photo_header">Photo</th>
                                    <th>Booking date</th>
                                    <th>Room size</th>
                                    <th>Duration</th>
                                    <th>Total payment</th>
                                    <th>Payment date</th>
                                </tr> || 
                                <tr className="header_row">
                                    <th className="customer_id">Customer id</th>
                                    <th>Survey date</th>
                                    <th>Room size</th>
                                    <th>Duration</th>
                                    <th>Payment</th>
                                    <th>Total payment</th>
                                    <th>Payment Date</th>
                                </tr>}
                            </thead>
                            
                            <tbody>
                                {(Object.keys(userInfo.rooms_rented).length > 0) && userInfo.rooms_rented.map(room => {
                                    if (userInfo.hotelier === false) {
                                        return (  
                                            <tr key={room.id} className={classNames('', {'expired': (room.expired === true)})}>
                                                <td className="row_element hotel_name">{room.hotel.name}</td>
                                                <td className="row_element "><div className="elipse" style={{ backgroundImage: `url(${room.hotel.picture_url})` }}></div></td>
                                                <td className="row_element booking_date">
                                                    <div>
                                                        <span>{room.survey_date_named}</span>
                                                        <span>{room.survey_date}</span>
                                                    </div>
                                                </td>
                                                <td className="row_element">{room.room_size.size}ft2</td>
                                                <td className="row_element">{room.duration - 1} day {room.duration} nights</td>
                                                <td className="row_element">{room.total_price}$(tax included)</td>
                                                <td className="row_element payment_date child_arrow">
                                                    <div className="child">
                                                        <div>
                                                            <span>{room.payment === true && `${room.survey_date}` || `${room.survey_end_date}`}</span>
                                                            <i onClick={(event) => showPaymentDetails(event)} className="fa-solid fa-chevron-down arrow_down"></i>
                                                            <i onClick={(event) => hidePaymentDetails(event)} className="fa-solid fa-chevron-up arrow_up"></i>
                                                        </div>
                                                        <div className="payment_details">
                                                            <span className={classNames('', {'completed_white': (room.payment === true), 'uncompleted': (room.payment != true)})}>{room.payment === true && 'completed' || 'uncompleted'}</span>
                                                            {(room.payment === false) && <>
                                                                <button onClick={() => completePayment(room)}>Complete</button>
                                                                <span>Or pay in the hotel <br></br>in cash after the<br></br> survey</span>
                                                            </>}
                                                        </div>
                                                    </div>
                                                </td>
                                                {(room.expired === true) && <td className="delete"><span>Rent date expired</span></td>}
                                            </tr>
                                    )} else {
                                        return (
                                            <tr key={room.id}>
                                                <td><span className="center_id">{room.customer.id}</span></td>
                                                <td className="booking_date">
                                                    <div>
                                                        <span>{room.survey_date_named}</span>
                                                        <span>{room.survey_date}</span>
                                                    </div>
                                                </td>
                                                <td>{room.room_size.size}ft2</td>
                                                <td>{room.duration - 1} day {room.duration} nights</td>
                                                <td className={classNames('', {'completed': (room.payment === true), 'uncompleted': (room.payment != true)})}>{room.payment === true && 'completed' || 'uncompleted'}</td>
                                                <td>{room.total_price}$(tax included)</td>
                                                <td className="row_element payment_date">
                                                    <div className="child">
                                                        <div>
                                                            <span>{room.payment === true && `${room.survey_date}` || `${room.survey_end_date}`}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                {(room.expired === true) && <td className="delete"><span>Rent date expired</span><button onClick={() => deleteRent(room.id)}>delete rent</button></td>}
                                            </tr>
                                        )
                                    }
                                })}
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {(userInfo.hotelier === true) && <ChartBox hotel_rooms={userInfo.hotel_rooms} />}

            <Footer />
        </section>
    );
}