import React from "react";

export default function PaymentDetails(){
    return (
        <div className="payment_details_wrapper">
            <div className="payment_details_container">
                <section className="details">
                    <h1>Payment Details:</h1>
                    <div className="content">
                        <div className="selection">
                            <span>Room size: 150ft2</span>
                            <div className="select_wrapper">
                                <select name="change_size">
                                    <option defaultValue>Change size</option>
                                    <option value="100">150ft2</option>
                                    <option value="200">150ft2</option>
                                    <option value="250">150ft2</option>
                                </select>
                            </div>
                        </div>
                        <div className="selection">
                            <span>1 night</span>
                            <div className="select_wrapper">
                                <select name="change_duration">
                                    <option defaultValue>Change duration</option>
                                    <option value="2">2 nights</option>
                                </select>
                            </div>
                        </div>
                        <ul>
                            <li>Payment per day: <span>110$</span> 90$ (1st day)</li>
                            <li>Security deposit: 60$</li>
                            <li>Total: 150$</li>
                            <li className="mrtravel_coupon"><span>MRtravel HYPHIN</span><span>coupon applied (40% off)</span></li>
                        </ul>
                    </div>
                    <div className="order_total">
                        <span>Order Total:</span>
                        <span>150$</span>
                        <span>120$</span>
                    </div>
                </section>
                <section className="payment">
                    <div className="header">Get <span>10%</span> extra discount if you pay right now!</div>
                    <button>Book and pay now</button>
                    <span className="or">or</span>
                    <p>Pay after a survey date:</p>
                    <input type="date"></input>
                    <button>Pay after the survey</button>
                </section>
            </div>
        </div>
    );
}