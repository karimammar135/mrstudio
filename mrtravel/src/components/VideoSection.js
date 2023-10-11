import React from "react";
import './video-section.css';
import VideoPlayer from './videoplayer.js';

export default function VideoSection({ page, img_path }){
    return (
        <div className="center-resort-surprises">
            <div className="resort-surprises">
                <div className="details">
                    <span className="title">{(page === "main_page") && "Resort Surprises" || "Sheraton New York"}</span>
                    <span className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas</span>
                    <div className="facilities">
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-person-swimming"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Infinity Pool" || "Elegance"}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-umbrella-beach"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "The Beach" || "Best survices in New York City"}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-volleyball"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Beach Activities" || "Gym training place"}</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                {(page === "main_page") && <i className="fa-solid fa-sun"></i> || <i className="fa-solid fa-star"></i>}  
                            </div>
                            <span>{(page === "main_page") && "Vitamin D" || "High class swimming pools"}</span>
                        </div>
                    </div>
                </div>
                <VideoPlayer img_path={img_path} />
            </div>
        </div>
    );
}