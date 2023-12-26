import React from "react";

import './payment.css';
import getCookie from './getCookie.js';
import UpdateURL from "./UpdateURL.js";

export default function Payment({ paymentObject }){
    // Payment details 
    const[payment_details, setPayment_details] = React.useState(paymentObject);
    const[picture_url, setPicture_url] = React.useState(null);
    const[route, setRoute] = React.useState(null);

    const[authenticated, setAuthenticated] = React.useState(false);
    // Check if user is authenticated
    React.useEffect(() => {
        fetch('/authentication')
        .then(response => response.json())
        .then(data => {
            setAuthenticated(data.authenticated)
            if(!data.authenticated) {
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    // Save the payment object in local storage
    React.useEffect(() => {
        if (Object.keys(paymentObject).length === 0){
            if (localStorage.getItem('payment_details') != null){
                setPayment_details(JSON.parse(localStorage.getItem('payment_details')));
            } else {
                localStorage.setItem('payment_details', JSON.stringify(paymentObject));
            }
        } else {
            localStorage.setItem('payment_details', JSON.stringify(paymentObject));
        }
        if (payment_details.type === 'indirect'){
            setPicture_url(payment_details.hotel.picture_url)
            setRoute('complete_payment')
        } else {
            setPicture_url(payment_details.picture_url)
            setRoute('rent_room')
        }
    }, []);

    // Rent the room
    function rent_room(event){
        event.preventDefault();

        // Get csrf token
        const csrftoken = getCookie('csrftoken');
        // Fetch the data to the data base to rent a room
        fetch(`/${route}`, {
            method: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            body: JSON.stringify({
                payment_details: payment_details
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message != null){
                localStorage.clear();
                console.log(result.message);
                window.location.href = '/account';
            } else {
                alert(result.error)
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    // Html Page
    return (
        <>
            {(Object.keys(payment_details).length === 0) && <div></div> || 
                <section className="payment_page">
                    <div className="payment_details" style={{ backgroundImage: `url(${picture_url})` }}>
                        {(payment_details.type === 'direct') && 
                            <div className="details_container">
                                <div className="top">
                                    <span className="size">Room Size: {payment_details.room_selected.size} ft2</span>
                                    <span className="duration">Duration: {payment_details.duration} days</span>
                                </div>
                                {(payment_details.direct_payment_discount > 0) && <p>You got <span>{payment_details.direct_payment_discount}%</span> discount for direct <br></br> payment!</p> || <p>Book and pay right now!</p>}
                                <div className="order_total">
                                    <span className="reg">Order Total:</span>
                                    <span className={(payment_details.mrtravel_hyphin === false) ? "": "cross"}> {payment_details.total_price}$</span>
                                    {(payment_details.mrtravel_hyphin === true) && <span className={(payment_details.mrtravel_hyphin === false) ? "hide": ""}>{payment_details.total_price - (payment_details.total_price * (40/100))}$</span>}
                                </div>
                                <h1>{payment_details.hotel_name}</h1>
                            </div> || <div className="details_container" style={{opacity: '0'}}></div>}
                    </div>
                    <section>
                        <form className="payment_form" onSubmit={(event) => rent_room(event)}>
                            <div className="head">
                                <span>pay with card</span>
                            </div>
                            
                            <div className="input_field_container">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" required></input>
                            </div>
                            <div className="card_details input_field_container">
                                <label htmlFor="card_number">Card details</label>
                                <div className="card_num_container">
                                    <input id="card_number" type="tel" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="1234 1234 1234 1234" required></input>
                                    <div>
                                        <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="visa"></img>
                                        <img src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png" alt="mastercard"></img>
                                        <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Amex-256.png" alt="amex"></img>
                                        <img src="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/discover-512.png" alt="discover"></img>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <input id="date" type="tel" maxLength="4" name="date" placeholder="MM / YY" required></input>
                                    <div className="cvc"><input type="tel" maxLength="3" placeholder="CVC"></input><img src="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/security_code_front-256.png" alt="cvc"></img></div>
                                </div>
                            </div>
                            <div className="input_field_container">
                                <label htmlFor="name_on_card">Name on card</label>
                                <input id="name_on_card" type="text" required></input>
                            </div>
                            <div className="country_region input_field_container">
                                <label>Country or Region</label>
                                <select name="country">
                                    <option value="USA">United States</option>
                                    <option value="LEB">Lebanon</option>
                                </select>
                                <input type="tel" maxLength="3" placeholder="ZIP" required></input>
                            </div>
                            
                            <input type="submit" value={"Pay $" + payment_details.total_price}></input>
                        </form>
                    </section>
                </section>
            }
        </> 
    );
}