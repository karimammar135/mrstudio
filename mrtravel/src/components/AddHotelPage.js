import React from "react";

import Navbar from "./navbar.js";
import getCookie from "./getCookie.js";
import './addhotelpage.css';

export default function AddHotelPage(){
    const[rooms, setRooms] = React.useState([]);
    const[coupon, setCoupon] = React.useState(false);

    // Check if user is authenticated
    React.useEffect(() => {
        fetch('/user_info')
        .then(response => response.json())
        .then(data => {
            if(data.error != null){
                console.log(data.error)
                location.replace('/login');
            }
            else if(data.hotelier === false){
                console.log("customer account can't post an hotel")
                location.replace('/account');
            }
        })
        .catch(error => {
            alert(error)
        })
    }, []);

    // Coupon Icon animation effect
    React.useEffect(() => {
        let icon = document.querySelector('.coupon i');
        icon.classList.add('fa-flip');
        let timer = setTimeout(() => {
            icon.classList.remove('fa-flip');
        }, 1000);
    }, [coupon]);

    // Add new room size
    function AddRoom(event){
        event.preventDefault();
        // Collect submitted data
        let size = document.querySelector('.part4 input[name="room_size"]').value;
        let price = document.querySelector('.part4 input[name="room_price"]').value;
        let discount = document.querySelector('.part4 input[name="discount"]').value;
        let discount_type = document.querySelector('.part4 .dicount_field .select_wrapper select').value;
        let amount = document.querySelector('.part4 input[name="room_amount"]').value;

        // Check for validations
        if (size === "" || price === "" || amount === ""){
            alert('Please fill All required fields before submission!');
            return false;
        }
        if(amount === '0'){
            alert('Amount 0 is unaccepted.');
            return false;
        }
        if (size < 90){
            alert('Invalid room size(too small)');
            return false;
        }
        if(discount === ""){
            discount = 0;
        }
        else if(discount >= 100){
            alert('Discount too high!!!');
            return false;
        }
        for(let i = 0; i < rooms.length; i++){
            if(size === rooms[i].size){
                alert('This room size has already been added!');
                return false;
            }
        }

        // Save the room info in the state
        setRooms([
            ...rooms,
            {size: size, price: price, amount: amount, discount: discount, discount_type: discount_type}
        ]);
        console.log(rooms);

        // Emptying the input fields
        document.querySelector('.part4 input[name="room_size"]').value = '';
        document.querySelector('.part4 input[name="room_price"]').value = '';
        document.querySelector('.part4 input[name="discount"]').value = '';
        document.querySelector('.part4 input[name="room_amount"]').value = '';
    }

    // Delete room 
    function DeleteRoom(size){
        setRooms(rooms => 
            rooms.filter(room => {
                if (room.size !== size){
                    return room;
                }
            }),
        );
    }

    // Submit Form
    function submitForm(event){
        // Prevent default submission
        event.preventDefault();

        // Collect submitted data
        let hotel_name = document.querySelector('input[name="hotel_name"]').value;
        let check_in = document.querySelector('input[name="check_in"]').value;
        let check_out = document.querySelector('input[name="check_out"]').value;
        let locality = document.querySelector('input[name="locality"]').value;
        let city = document.querySelector('input[name="city"]').value;
        let country = document.querySelector('input[name="country"]').value;
        let location_url = document.querySelector('input[name="loction_url"]').value;
        let youtube_video_url = document.querySelector('input[name="youtube_video_url"]').value;
        let description = document.querySelector('textarea[name="description"]').value;
        let feature1 = document.querySelector('input[name="feature1"]').value;
        let feature2 = document.querySelector('input[name="feature2"]').value;
        let feature3 = document.querySelector('input[name="feature3"]').value;
        let feature4 = document.querySelector('input[name="feature4"]').value;
        let pic_url = document.querySelector('input[name="pic_url"]').value;
        let security_deposit = document.querySelector('input[name="security_deposit"]').value;
        let direct_payment_discount = document.querySelector('input[name="direct_payment_discount"]').value;
        let mrtravel_hyphin = coupon;

        // Check for necessary requirements
        if (rooms.length === 0){
            alert('You should at least have 1 room size available');
            return false;
        }
        if(direct_payment_discount === ""){
            direct_payment_discount = 0;
        }

        // Get csrf token
        const csrftoken = getCookie('csrftoken');
        // Fetch submitted data to the back-end using API
        fetch('/hotels', {
            method: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            body: JSON.stringify({
                hotel_name: hotel_name,
                check_in: check_in,
                check_out: check_out,
                locality: locality,
                city: city,
                country: country,
                location_url: location_url,
                youtube_video_url: youtube_video_url,
                description: description,
                feature1: feature1,
                feature2: feature2,
                feature3: feature3,
                feature4: feature4,
                pic_url: pic_url,
                security_deposit: security_deposit,
                direct_payment_discount: direct_payment_discount,
                mrtravel_hyphin: mrtravel_hyphin,
                rooms: rooms
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message != null){
                console.log(data.message)
                location.replace('/');
            }
            else {
                alert(data.error)
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    return (
        <section className="add_hotel_page">
            <Navbar page="add_hotel_page" />
            <div className="background_triangle_1"></div>
            <div className="background_triangle_2"></div>
        
            <div className="body">
                <div className="content">
                    <div className="header">
                        <h1>It may take a while, so grab your favorite Drink and start filling</h1>
                        <i className="fa-solid fa-mug-hot coffee_cup"></i>
                    </div>

                    <form className="main_form" onSubmit={(event) => submitForm(event)}>
                        <div className="part1 default_layout">
                            <div className="default_input">
                                <label>Hotel name</label>
                                <input name="hotel_name" type="text" placeholder="Hotel name" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Check in</label>
                                <input name="check_in" type="time" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Check out</label>
                                <input name="check_out" type="time" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Locality</label>
                                <input name="locality" type="text" placeholder="Locality" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>City</label>
                                <input name="city" type="text" placeholder="City" autoComplete="off" required></input>
                            </div>
                        </div>
                        <div className="part2 default_layout">
                            <div className="default_input">
                                <label>Country</label>
                                <input name="country" type="text" placeholder="Country" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Link for a location on google maps</label>
                                <input name="loction_url" type="url" placeholder="https://" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Link for a youtube video</label>
                                <input name="youtube_video_url" type="url" placeholder="https://" autoComplete="off" required></input>
                            </div>
                            <div className="default_input description">
                                <label>Description</label>
                                <textarea name="description" placeholder="Describe your hotel" required></textarea>
                            </div>
                        </div>
                        <div className="part3 default_layout">
                            <div className="default_input">
                                <label>Key Features</label>
                                <ul>
                                    <li><div></div><input name="feature1" type="text" placeholder="Feature 1" autoComplete="off" required></input></li>
                                    <li><div></div><input name="feature2" type="text" placeholder="Feature 2" autoComplete="off" required></input></li>
                                    <li><div></div><input name="feature3" type="text" placeholder="Feature 3" autoComplete="off" required></input></li>
                                    <li><div></div><input name="feature4" type="text" placeholder="Feature 4" autoComplete="off" required></input></li>
                                </ul>
                            </div>
                            <div className="default_input picture_link">
                                <label>Link for a descriptive hotel picture</label>
                                <input name="pic_url" type="url" placeholder="https://" autoComplete="off" required></input>
                            </div>
                        </div>
                        <div className="part4 default_layout">
                            <h1>Room sizes</h1>
                            <div className="default_input">
                                <label>Room size</label>
                                <input name="room_size" type="number" placeholder="Size in ft2" autoComplete="off"></input>
                            </div>
                            <div className="default_input">
                                <label>Price for this room size</label>
                                <input name="room_price" type="float" placeholder="Price in $" autoComplete="off"></input>
                            </div>
                            <div className="default_input dicount_field_container">
                                <label>Discount(optional)</label>
                                <div className="dicount_field">
                                    <input name="discount" type="number" placeholder="%" autoComplete="off"></input>
                                    <div className="select_wrapper">
                                        <select>
                                            <option defaultValue>firts day</option>
                                            <option>always</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="default_input">
                                <label>Amount of this room size</label>
                                <input name="room_amount" type="number" placeholder="amount" autoComplete="off"></input>
                            </div>
                            <button className="add_room_btn" onClick={(event) => AddRoom(event)}>Add Room</button>
                        </div>
                        <div className="part5 default_layout">
                            <div className="default_input">
                                <label>Your Rooms</label>
                            </div>
                            <ul className="rooms">
                                {rooms.length === 0 && <span className="none">None</span>}
                                {rooms.map(room => {
                                    return (
                                        <li key={crypto.randomUUID()}>
                                            <i className="fa-solid fa-xmark cancel" onClick={() => DeleteRoom(room.size)}></i>
                                            <span>{room.size} ft2</span>
                                            <i className="fa-solid fa-chevron-down arrow_down"></i>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="part6 default_layout">
                            <div className="default_input">
                                <label>Security deposit</label>
                                <input name="security_deposit" type="number" placeholder="Price in $" autoComplete="off" required></input>
                            </div>
                            <div className="default_input">
                                <label>Discount for direct payment (optional)</label>
                                <input name="direct_payment_discount" type="number" placeholder="%" autoComplete="off"></input>
                            </div>
                            <div className="default_input">
                                <label>MRtravel HYPHIN</label>
                                <div className="coupon">
                                    <span>40%</span>
                                    {coupon && <i className="fa-regular fa-circle-check applied_icon"></i> || <i className="fa-solid fa-ban unpplied_icon"></i>}
                                    <button onClick={(event) => {event.preventDefault(); setCoupon(!coupon)}}>{coupon &&  'Unapply coupon' || 'Apply coupon'}</button>
                                </div>
                                <p className="coupon_description">This coupon will be applied on all you items (rooms). You can apply or unapply this token later whenever you want.</p>
                            </div>
                            <p className="note">Note: All the fields you enterd in this page are editable.</p>
                            <input type="submit" value="Add Hotel" className="add_hotel_btn"></input>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}