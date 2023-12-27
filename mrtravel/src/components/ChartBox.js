import React from "react";
import { Chart } from "react-google-charts";

import './ChartBox.css';

export default function ChartBox({hotel_rooms}){
    // Set Chart1 data
    let Chart1_data = [["Room size(ft2)", "Price ($)"], [0, 0]];
    for (let i = 0; i < hotel_rooms.length; i++){
        Chart1_data = [...Chart1_data, [hotel_rooms[i].size, hotel_rooms[i].price_per_day]]
    }

    // Set Chart2 data
    let Chart2_data = [
        ["Task", "Hours per Day"],
    ];
    for (let i = 0; i < hotel_rooms.length; i++){
        Chart2_data = [...Chart2_data, [`${hotel_rooms[i].size} ft2`, hotel_rooms[i].amount]]
    }

    return (
        <div className="chart_centering">
            <div className="chart">
                <h1 className="chart_title">Amount of rooms according to thire size:</h1>
            </div>
            <Chart
                chartType="PieChart"
                data={Chart2_data}
                width="100%"
                height={"400px"}
            />
            <div className="chart">
                <h1 className="chart_title">Average prices($) as room sizes increase:</h1>
            </div>
            <Chart
                chartType="LineChart"
                data={Chart1_data}
                width="100%"
                height="fit-content"
                legendToggle
                style={{minHeight: "300px"}}
            />
        </div>
    )
}