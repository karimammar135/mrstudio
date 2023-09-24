import React from "react";
import './RelaxingPleasure.css';

export default function RelaxingPleasure(){

    document.addEventListener('DOMContentLoaded', () => {
        let scrollbar = document.querySelector('.images-scrollbar');
        scrollbar.scrollLeft = ((scrollbar.scrollWidth - scrollbar.clientWidth - 49) / 2);
    });

    return ( 
        <div className="center-relaxing-pleasure">
            <div className="relaxing-pleasure-container">
                <div className="images-regular images-defaults">
                    <div className="card card-1">
                        <div className="details">
                            <div className="header">
                                <span className="resort-name">MRtravel Resort</span>
                                <div className="rating">
                                    <i className="fa-regular fa-heart"></i>
                                    <span>4.7</span>
                                </div>
                            </div>
                            <div className="bar"></div>
                            <a className="view-details" href="#">View Details</a>
                        </div>
                    </div>
                    <div className="card card-3">
                        <div className="details">
                            <div className="header">
                                <span className="resort-name">MRtravel Resort</span>
                                <div className="rating">
                                    <i className="fa-regular fa-heart"></i>
                                    <span>4.7</span>
                                </div>
                            </div>
                            <div className="bar"></div>
                            <a className="view-details" href="#">View Details</a>
                        </div>
                    </div>
                    <div className="card card-2">
                        <div className="details">
                            <div className="header">
                                <span className="resort-name">MRtravel Resort</span>
                                <div className="rating">
                                    <i className="fa-regular fa-heart"></i>
                                    <span>4.7</span>
                                </div>
                            </div>
                            <div className="bar"></div>
                            <a className="view-details" href="#">View Details</a>
                        </div>
                    </div>
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
                <div className="card card-1">
                    <div className="details">
                        <div className="header">
                            <span className="resort-name">MRtravel Resort</span>
                            <div className="rating">
                                <i className="fa-regular fa-heart"></i>
                                <span>4.7</span>
                            </div>
                        </div>
                        <div className="bar"></div>
                        <a className="view-details" href="#">View Details</a>
                    </div>
                </div>
                <div className="card card-3">
                    <div className="details">
                        <div className="header">
                            <span className="resort-name">MRtravel Resort</span>
                            <div className="rating">
                                <i className="fa-regular fa-heart"></i>
                                <span>4.7</span>
                            </div>
                        </div>
                        <div className="bar"></div>
                        <a className="view-details" href="#">View Details</a>
                    </div>
                </div>
                <div className="card card-2">
                    <div className="details">
                        <div className="header">
                            <span className="resort-name">MRtravel Resort</span>
                            <div className="rating">
                                <i className="fa-regular fa-heart"></i>
                                <span>4.7</span>
                            </div>
                        </div>
                        <div className="bar"></div>
                        <a className="view-details" href="#">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    );
}