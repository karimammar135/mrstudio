import React from "react";

import Navbar from "./navbar.js";
import getCookie from "./getCookie.js";
import './addhotelpage.css';

export default function AddHotelPage({ type, path }){
    const[route, setRoute] = React.useState('/hotels/limit0')
    const[rooms, setRooms] = React.useState([]);
    const[coupon, setCoupon] = React.useState(false);
    const[editRoom, setEditRoom] = React.useState({
        activate: false,
        room: {}
    });
    // If type is edit then hotel id will be used
    const [hotel_id, setHotel_id] = React.useState(path.split(/\//)[2]);
    const [hotel_details, setHotel_details] = React.useState({check_in: "", check_out: "", city: "", country: "", description: "", direct_payment_discount: 0, feature1: "", feature2: "", feature3: "Gym training place", feature4: 
        "", id: 22, locality: "", location: "", mrtravel_hyphin: false, name: "Miracle Resort", owner_id: 1, picture_url: "", security_deposit: 60, youtube_video: ""
    });

    // Fetch Hotel Data
    function fetchHotelData(){
        fetch(`/hotel_info${hotel_id}`)
        .then(response => response.json())
        .then(data => {
            if(data.error != null){
                alert(error)
            } else {
                setRooms(data.rooms);
                setHotel_details({
                    ...data.hotel,
                    check_in: toMilitary(data.hotel.check_in),
                    check_out: toMilitary(data.hotel.check_out)
                })
                if (data.hotel.mrtravel_hyphin === true){
                    setCoupon(true)
                }
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    // Check if user is authenticated
    React.useEffect(() => {
        // Set apprpriate rout
        if (type === 'edit'){
            setRoute(`/edit_hotel${hotel_details.id}`)
        }
        // Fetch user info
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
            } else {
                if(type === 'edit'){
                    if (hotel_id != data.hotel.id){
                        alert('You are not the owner of this hotel')
                        window.location.href = '/';
                    } else {
                        fetchHotelData();
                    }
                }
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

        if(type === "edit"){
            // Get csrf token
            const csrftoken = getCookie('csrftoken');
            fetch('/add_room', {
                method: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                body: JSON.stringify({
                    hotel_id: hotel_id,
                    size: size,
                    price: price,
                    discount: discount,
                    discount_type: discount_type,
                    amount: amount
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error != null){
                    alert(data.error)
                } else {
                    window.location.reload();
                }
            })
            .catch(error => {
                alert(error)
            });
        } else {
            // Save the room info in the state
            setRooms([
                ...rooms,
                {size: size, price: price, amount: amount, discount: discount, discount_type: discount_type}
            ]);
        }

        // Emptying the input fields
        document.querySelector('.part4 input[name="room_size"]').value = '';
        document.querySelector('.part4 input[name="room_price"]').value = '';
        document.querySelector('.part4 input[name="discount"]').value = '';
        document.querySelector('.part4 input[name="room_amount"]').value = '';
    }

    // Delete room 
    function DeleteRoom(room_selected){
        if (type === "edit"){
            if(!confirm("Are you sure you want to delete this room?") ){
                return false;
            } else {
                if (rooms.length > 1){
                    fetch(`/delete_room${room_selected.id}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.error != null){
                            alert(data.error)
                        } else {
                            console.log(data.message)
                            window.location.reload();
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
                } else {
                    alert("You can't delete this room before adding another one!")
                }
            }
        } else {
            setRooms(rooms => 
                rooms.filter(room => {
                    if (room.size !== room_selected.size){
                        return room;
                    }
                }),
            );
        }
    }

    // Submit Form
    function submitForm(event){
        // Prevent default submission
        event.preventDefault();
        const submit_btn = document.querySelector('input[type="submit"]').value;

        // Collect submitted data
        let hotel_name = document.querySelector('input[name="name"]').value;
        let check_in = document.querySelector('input[name="check_in"]').value;
        let check_out = document.querySelector('input[name="check_out"]').value;
        let locality = document.querySelector('input[name="locality"]').value;
        let city = document.querySelector('input[name="city"]').value;
        let country = document.querySelector('input[name="country"]').value;
        let location_url = document.querySelector('input[name="loction"]').value;
        let youtube_video_url = document.querySelector('input[name="youtube_video"]').value;
        let description = document.querySelector('textarea[name="description"]').value;
        let feature1 = document.querySelector('input[name="feature1"]').value;
        let feature2 = document.querySelector('input[name="feature2"]').value;
        let feature3 = document.querySelector('input[name="feature3"]').value;
        let feature4 = document.querySelector('input[name="feature4"]').value;
        let pic_url = document.querySelector('input[name="picture_url"]').value;
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
        if (type === "edit"){
            setRooms([]);
        }

        // Get csrf token
        const csrftoken = getCookie('csrftoken');
        // Fetch submitted data to the back-end using API
        fetch(`${route}`, {
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

    // Handle input change (type = edit)
    const handleInputChange = (target) => {
        setHotel_details({
            ...hotel_details,
            [target.name]: target.value
        })
    }

    // Handle Input change when editing a room
    const handleRoomEdit = (target) => {
        let value = 0;
        if(target.value !== ''){
            value = parseInt(target.value)
        }
        setEditRoom({
            ...editRoom,
            room: {
                ...editRoom.room,
                [target.name]: value
            }
        })
    }
    
    // Conver AM/PM to 24-military time
    const toMilitary = (time) => {
        
        const slice_1 = time.slice(0, 2);
        const slice_2 = time.slice(3, 5);
        const slice_3 = time.slice(6, 8);
      
        if (slice_3 === "AM"){
            return `${slice_1}:${slice_2}`
        } else if (slice_3 === "PM"){
            return `${parseInt(slice_1) + 12}:${slice_2}`
        } else {
            return "00:00"
        }
    }

    // Activate Edit Room
    const activateEditRoom= (action, room) => {
        setEditRoom({
            activate: true,
            room: room
        })
    }

    const updateDiscountType = () => {
        let discount_type = document.querySelector('.part4 .dicount_field .select_wrapper select').value;
        setEditRoom({
            ...editRoom,
            room: {
                ...editRoom.room,
                discount_type: discount_type
            }
        })
    }
    // Edit room 
    const EditRoom = (e) => {
        e.preventDefault()

        // Check for validations
        if(editRoom.room.amount === 0){
            alert('Amount 0 is unaccepted.');
            return false;
        }
        if(editRoom.room.price_per_day === 0){
            alert('minimum price is 1$')
        }
        if (editRoom.room.size < 90){
            alert('Invalid room size(too small)');
            return false;
        }
        if(editRoom.room.discount >= 100){
            alert('Discount too high!!!');
            return false;
        }
        
        // Get csrf token
        const csrftoken = getCookie('csrftoken');
        // Fetch updated room data
        fetch('/edit_room', {
            method: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            body: JSON.stringify(editRoom.room)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error != null){
                alert(data.error)
            } else {
                console.log(data.message)
                // Reset room's input field data
                setEditRoom({
                    activate: false, 
                    room: {}
                })
                window.location.reload();
            }
        })
        .catch(error => {
            alert(error)
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
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.name} name="name" type="text" placeholder="Hotel name" autoComplete="off" required></input>
                                ||
                                <input name="name" type="text" placeholder="Hotel name" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Check in</label>
                                {(type === 'edit') && 
                                <input name="check_in" value={hotel_details.check_in} onChange={(e) => handleInputChange(e.target)} type="time" autoComplete="off" required></input>
                                ||
                                <input name="check_in" type="time" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Check out</label>
                                {(type === 'edit') && 
                                <input name="check_out" value={hotel_details.check_out} onChange={(e) => handleInputChange(e.target)} type="time" autoComplete="off" required></input>
                                ||
                                <input name="check_out" type="time" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Locality</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.locality} name="locality" type="text" placeholder="Locality" autoComplete="off" required></input>
                                ||
                                <input name="locality" type="text" placeholder="Locality" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>City</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.city} name="city" type="text" placeholder="City" autoComplete="off" required></input>
                                ||
                                <input name="city" type="text" placeholder="City" autoComplete="off" required></input>}
                            </div>
                        </div>
                        <div className="part2 default_layout">
                            <div className="default_input">
                                <label>Country</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.country} name="country" type="text" placeholder="Country" autoComplete="off" required></input>
                                ||
                                <input name="country" type="text" placeholder="Country" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Link for a location on google maps</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.location} name="loction" type="url" placeholder="https://" autoComplete="off" required></input>
                                ||
                                <input name="loction" type="url" placeholder="https://" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Link for a youtube video</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.youtube_video} name="youtube_video" type="url" placeholder="https://" autoComplete="off" required></input>
                                ||
                                <input name="youtube_video" type="url" placeholder="https://" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input description">
                                <label>Description</label>
                                {(type === 'edit') && 
                                <textarea onChange={(e) => handleInputChange(e.target)} value={hotel_details.description} name="description" placeholder="Describe your hotel" autoComplete="off" required></textarea>
                                ||
                                <textarea name="description" placeholder="Describe your hotel" required></textarea>}
                            </div>
                        </div>
                        <div className="part3 default_layout">
                            <div className="default_input">
                                <label>Key Features</label>
                                <ul>
                                    <li><div></div>{(type === 'edit') && <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.feature1} name="feature1" type="text" placeholder="Feature 1" autoComplete="off" required></input>||<input name="feature1" type="text" placeholder="Feature 1" autoComplete="off" required></input>}</li>
                                    <li><div></div>{(type === 'edit') && <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.feature2} name="feature2" type="text" placeholder="Feature 2" autoComplete="off" required></input>||<input name="feature2" type="text" placeholder="Feature 2" autoComplete="off" required></input>}</li>
                                    <li><div></div>{(type === 'edit') && <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.feature3} name="feature3" type="text" placeholder="Feature 3" autoComplete="off" required></input>||<input name="feature3" type="text" placeholder="Feature 3" autoComplete="off" required></input>}</li>
                                    <li><div></div>{(type === 'edit') && <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.feature4} name="feature4" type="text" placeholder="Feature 4" autoComplete="off" required></input>||<input name="feature4" type="text" placeholder="Feature 4" autoComplete="off" required></input>}</li>
                                </ul>
                            </div>
                            <div className="default_input picture_link">
                                <label>Link for a descriptive hotel picture</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.picture_url} name="picture_url" type="url" placeholder="https://" autoComplete="off" required></input>
                                ||
                                <input name="picture_url" type="url" placeholder="https://" autoComplete="off" required></input>}
                            </div>
                        </div>
                        <div className="part4 default_layout">
                            <h1>Room sizes</h1>
                            <div className="default_input">
                                <label>Room size</label>
                                {editRoom.activate && <input name="room_size" defaultValue={editRoom.room.size} readOnly="readonly" type="number" placeholder="Size in ft2" autoComplete="off"></input>
                                || <input name="room_size" type="number" placeholder="Size in ft2" autoComplete="off"></input>}
                            </div>
                            <div className="default_input">
                                <label>Price for this room size</label>
                                {editRoom.activate && 
                                <input onChange={(e) => handleRoomEdit(e.target)} defaultValue={editRoom.room.price_per_day} name="price_per_day" type="float" placeholder="Price in $" autoComplete="off"></input>
                                || 
                                <input name="room_price" type="float" placeholder="Price in $" autoComplete="off"></input>}
                            </div>
                            <div className="default_input dicount_field_container">
                                <label>Discount(optional)</label>
                                <div className="dicount_field">
                                    {editRoom.activate && 
                                    <input onChange={(e) => handleRoomEdit(e.target)} defaultValue={editRoom.room.discount} name="discount" type="number" placeholder="%" autoComplete="off"></input>
                                    || 
                                    <input name="discount" type="number" placeholder="%" autoComplete="off"></input>}
                                    {editRoom.activate && 
                                    <div className="select_wrapper">
                                        <select onChange={() => updateDiscountType()}>
                                            {editRoom.room.discount_type === "always" && 
                                                <>
                                                    <option>first_day</option>
                                                    <option selected>always</option>
                                                </> ||
                                                <>
                                                    <option selected>first_day</option>
                                                    <option>always</option>
                                                </>
                                            }
                                        </select>
                                    </div> ||
                                    <div className="select_wrapper">
                                        <select>
                                            <option defaultValue>first_day</option>
                                            <option>always</option>
                                        </select>
                                    </div>}
                                </div>
                            </div>
                            <div className="default_input">
                                <label>Amount of this room size</label>
                                {editRoom.activate && 
                                <input onChange={(e) => handleRoomEdit(e.target)} defaultValue={editRoom.room.amount} name="amount" type="number" placeholder="amount" autoComplete="off"></input>
                                || 
                                <input name="room_amount" type="number" placeholder="amount" autoComplete="off"></input>}
                            </div>
                            {(editRoom.activate) && <button className="add_room_btn" onClick={(event) => EditRoom(event) }>Edit Room</button>
                            || <button className="add_room_btn" onClick={(event) => AddRoom(event)}>Add Room</button>}
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
                                            <i className="fa-solid fa-xmark cancel" onClick={() => DeleteRoom(room)}></i>
                                            <span>{room.size} ft2</span>
                                            {(type === "edit") && ((!editRoom.activate) && <button className="edit_room_btn" onClick={() => activateEditRoom('activate', room)}>Edit</button>) || <i className="fa-solid fa-chevron-down arrow_down"></i>}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="part6 default_layout">
                            <div className="default_input">
                                <label>Security deposit</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.security_deposit} name="security_deposit" type="number" placeholder="Price in $" autoComplete="off" required></input>
                                ||
                                <input name="security_deposit" type="number" placeholder="Price in $" autoComplete="off" required></input>}
                            </div>
                            <div className="default_input">
                                <label>Discount for direct payment (optional)</label>
                                {(type === 'edit') && 
                                <input onChange={(e) => handleInputChange(e.target)} value={hotel_details.direct_payment_discount} name="direct_payment_discount" type="number" placeholder="%" autoComplete="off" required></input>
                                ||
                                <input name="direct_payment_discount" type="number" placeholder="%" autoComplete="off"></input>}
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
                            {(type === 'edit') && <input type="submit" value="Edit Hotel" className="add_hotel_btn"></input> || <input type="submit" value="Add Hotel" className="add_hotel_btn"></input>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}