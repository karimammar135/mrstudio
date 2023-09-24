import React from "react";
import './resorts.css';

export default function Resorts(){
    
    // After the dom content loads make the carousel work
    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.carousel');
        const arrowBtns = document.querySelectorAll('.carousel-wrapper i');
        const firstCardWidth = document.querySelector('.card1').offsetWidth;
        const cards = document.querySelectorAll('.card');

        cards.forEach(el => {
            el.addEventListener('click', () => {console.log(`card clicked`)})
        });

        // Add event listener for arrows to handle carousel scroll left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
            })
        });
  
    });


    return (
        <div className="resorts-container">
            <span className="title">Entire City Of Choice</span>
            <div className="hotels-choices">
                <div className="carousel-wrapper">
                    <i id="left" className="fa-solid fa-circle-chevron-left arrow"></i>
                    <ul className="carousel">
                        <li className="card card1">
                            <div className="hotel-img img1">
                                <div className="info">
                                    <span>MIRACLE RESORT</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$600.00</span>
                                    <span className="booking-id">Booking ID: 7595364</span>
                                    <span className="country">Turkey Resort</span>
                                </div>
                                
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                        <li className="card">
                            <div className="hotel-img img2">
                                <div className="info">
                                    <span>Warwick Hotels & Resorts</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$400.00</span>
                                    <span className="booking-id">Booking ID: 8279376</span>
                                    <span className="country">Warwick Hotels</span>
                                </div>
                                
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                        <li className="card">
                            <div className="hotel-img img3">
                                <div className="info">
                                    <span>ISO - How Hitton is  going <br></br> green</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$500.000</span>
                                    <span className="booking-id">Booking ID: 9735727</span>
                                    <span className="country">ISO - Hitton</span>
                                </div>
                                
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                        <li className="card">
                            <div className="hotel-img img4">
                                <div className="info">
                                    <span>Barceló Margaritas Hotel</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$320.00</span>
                                    <span className="booking-id">Booking ID: 9724659</span>
                                    <span className="country">Gran Canaria</span>
                                </div>
                                
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                        <li className="card">
                            <div className="hotel-img img5">
                                <div className="info">
                                    <span>Sackman Hotel</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$450.00</span>
                                    <span className="booking-id">Booking ID: 5711683</span>
                                    <span className="country">Greece Hotels</span>
                                </div>
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                        <li className="card">
                            <div className="hotel-img img6">
                                <div className="info">
                                    <span>Kassel Wellness Schlosshotel</span>
                                    <div className="add-hotel">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="details">
                                    <span className="price">$300.00</span>
                                    <span className="booking-id">Booking ID: 8624870</span>
                                    <span className="country">Chinese Resorts</span>
                                </div>
                                <div className="secure-logo">
                                    <i className="fa-solid fa-house-lock"></i>
                                    <span>Secure</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <i id="right" className="fa-solid fa-circle-chevron-right arrow"></i>
                </div>
                <div className="blue-background"></div>
            </div>
        </div>
    )
}