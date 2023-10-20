import React from "react";
import './video-section.css';
import VideoPlayer from './videoplayer.js';

export default function VideoSection({ page, hotel }){
    return (
        <div className="center-resort-surprises">
            <div className="resort-surprises">
                <div className="details">
                    <span className="title">{(page === "main_page") && "Resort Surprises" || hotel.name }</span>
                    <span className="description">{(page === "main_page") && "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas" || hotel.description }</span>
                    <div className="facilities">
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-person-swimming"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Infinity Pool" || hotel.feature1}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-umbrella-beach"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "The Beach" || hotel.feature2}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-volleyball"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Beach Activities" || hotel.feature3}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-sun"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Vitamin D" || hotel.feature4}</span>
                        </div>
                    </div>
                </div>
                <VideoPlayer page={page} hotel={hotel} />
            </div>
        </div>
    );
}