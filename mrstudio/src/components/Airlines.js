import React from "react";
import './Airlines.css';

import biman from './images/biman.png';
import malaysia from './images/malaysia.jpg';
import thai_lion from './images/thai-lion.jpg';
import emirates from './images/emirates.png';
import delta from './images/delta.jpg';
import qatar from './images/qatar.png';
import smiley_woman from './images/smiley-woman.png';
import smiley_woman_2 from './images/smiley-woman-2.png';

export default function Airlines(){
    return (
        <div className="airlines-background">
            <div className="airlines-wrapper-container">
                <div className="airlines-wrapper">
                    <h1>Search for other Top Airlines</h1>
                    <div className="airlines-list">
                        <ul>
                            <li className="biman">
                                <img src={biman} alt="biman"></img>
                                <span>Biman BD Airlines</span>
                            </li>
                            <li className="malaysia">
                                <img src={malaysia} alt="malaysia"></img>
                                <span>Malaysia Airlines</span>
                            </li>
                            <li className="thai_lion">
                                <img src={thai_lion} alt="thai-lion"></img>
                                <span>Thai Lion Air</span>
                            </li>
                        </ul>
                        <ul>
                            <li className="emirates">
                                <img src={emirates} alt="emirates"></img>
                                <span>Emirates</span>
                            </li>
                            <li className="delta">
                                <img src={delta} alt="delta"></img>
                                <span>Delta Airlines</span>
                            </li>
                            <li className="qatar">
                                <img src={qatar} alt="qatar"></img>
                                <span>Qatar Airways</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <img src={smiley_woman} alt="smiley woman" className="smiley_woman"></img>
                <img src={smiley_woman_2} alt="smiley woman" className="smiley_woman_2"></img>
            </div>
        </div>
    );
}