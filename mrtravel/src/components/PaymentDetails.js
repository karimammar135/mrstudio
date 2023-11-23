import React from "react";

import UpdateURL from './UpdateURL.js';

export default function PaymentDetails({ hotel, rooms, room_selected, setRoom_selected, showPaymentPage, authenticated }){
    // States
    const[state, setState] = React.useState({
        duration: 1,
        change_duration: false,
        total_price: 0
    });

    // Current date
    var today = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
    console.log(today);

    // Set Totel Price
    React.useEffect(() => {
        if (room_selected.discount_type === "first_day") {
            setState({
                ...state,
                total_price: hotel.security_deposit + (calcDiscount(room_selected.price_per_day, room_selected.discount)) + (room_selected.price_per_day * (state.duration - 1))
            });
        } else {
            setState({
                ...state,
                total_price: hotel.security_deposit + ((calcDiscount(room_selected.price_per_day, room_selected.discount)) * state.duration)
            });
        }
    },[state.duration, room_selected]);

    // Change duration
    function changeDuration(event){
        event.preventDefault();
        let new_duration = document.querySelector("input[name='duration']").value;
        if (new_duration <= 0){
            alert('Duration must at least be 1');
            return false;
        }
        setState({
            duration: new_duration,
            change_duration: false,
        });
    }

    // Calculate disount on price
    function calcDiscount(price, discount){
        let final_price = price - (price * (discount/100));
        return final_price;
    }

    // Submit form
    function submit_form(event){
        event.preventDefault();
        if(authenticated === true){
            const survey_date = document.querySelector('input[name=survey_date]').value;
            showPaymentPage(state.duration, state.total_price, survey_date)
        }
        else{
            alert('Login in order to pay'); 
            window.location.href='/login'
        }
    }

    return (
        <div className="payment_details_wrapper">
            <div className="payment_details_container">
                <section className="details">
                    <h1>Payment Details:</h1>
                    <div className="content">
                        <div className="selection">
                            <span>Room size: {(room_selected != null && room_selected.size)}ft2</span>
                            <div className="select_wrapper">
                                <select name="change_size" onChange={(event) => setRoom_selected(JSON.parse(event.target.value))}>
                                    <option disabled defaultValue>Change size</option>
                                    {rooms.map(room => {
                                        return <option key={room.id} value={JSON.stringify(room)}>{room.size}ft2</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="selection">
                            {
                                (state.change_duration === false) && <>
                                    <span>{state.duration} day/s</span>
                                    <button className="change_duration_btn" onClick={() => setState({...state, change_duration: true})}>Change duration</button>
                                </> || <>
                                    <form onSubmit={(event) => changeDuration(event)}>
                                        <input name="duration" type="number" placeholder="" required></input>
                                        <span> day/s </span>
                                        <input type="submit" value="Save" className="change_duration_btn"></input>
                                    </form>
                                </>
                            }
                        </div>
                        <ul>
                            <li>Payment per day: <span className={(room_selected.discount != 0) ? "cross": ""}>{room_selected.price_per_day}$</span> {(room_selected.discount != 0) && `${calcDiscount(room_selected.price_per_day, room_selected.discount)}$`} {(room_selected.discount != 0 && room_selected.discount_type === "first_day") && "(1st day)"}</li>
                            <li>Security deposit: {hotel.security_deposit}$</li>
                            <li>available_rooms: {(room_selected.available_rooms === 0) && "No more available rooms" || `${room_selected.available_rooms}`}</li>
                            <li>Total: {state.total_price}$</li>
                            {(hotel.mrtravel_hyphin === true) && <li className="mrtravel_coupon"><span>MRtravel HYPHIN</span><span>coupon applied (40% off)</span></li>}
                        </ul>
                    </div>
                    <div className="order_total">
                        <span className="reg">Order Total:</span>
                        <span className={(hotel.mrtravel_hyphin === false) ? "": "cross"}> {state.total_price}$</span>
                        {(hotel.mrtravel_hyphin === true) && <span className={(hotel.mrtravel_hyphin === false) ? "hide": ""}>{state.total_price - (state.total_price * (40/100))}$</span>}
                    </div>
                </section>
                <form className={(room_selected.available_rooms != 0) ? "payment": "payment disabled"} onSubmit={(event) => submit_form(event)}>
                    {(hotel.direct_payment_discount > 0) && <div className="header">Get <span>{hotel.direct_payment_discount}%</span> extra discount if you pay right now!</div> || <div className="header">Book and pay right now!</div>}
                    <input name="survey_date" type="date" min={today} required></input>
                    <input type="submit" value="Book and pay now"></input>
                    <span className="or">or</span>
                    <p>Pay after a survey date:</p>
                    <button>Pay after the survey</button>
                </form>
            </div>
        </div>
    );
}