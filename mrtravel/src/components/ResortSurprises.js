import React from "react";
import './resort-surprises.css';
import VideoPlayer from './videoplayer.js';

export default function ResortSurprises(){
    return (
        <div className="center-resort-surprises">
            <div className="resort-surprises">
                <div className="details">
                    <span className="title">Resort Surprises</span>
                    <span className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas</span>
                    <div className="facilities">
                        <div className="facility">
                            <div className="icon">
                                <i className="fa-solid fa-person-swimming"></i>
                            </div>
                            <span>Infinity Pool</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                <i className="fa-solid fa-umbrella-beach"></i>
                            </div>
                            <span>The Beach</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                            <i className="fa-solid fa-volleyball"></i>
                            </div>
                            <span>Beach Activities</span>
                        </div>
                        <div className="facility">
                            <div className="icon">
                                <i className="fa-solid fa-sun"></i>
                            </div>
                            <span>Vitamin D</span>
                        </div>
                    </div>
                </div>
                <VideoPlayer />
            </div>
        </div>
    );
}