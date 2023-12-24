import React from "react";
import UpdateURL from './UpdateURL.js';

export default function SearchBar({ setShowSearchBar, hotels, setResults, results , setInput, input }){
    
    // Check results
    const checkResults = (value) => {
        const results = hotels.filter((hotel) => {
            return hotel.name.toLowerCase().includes(value)
        })
        setResults(results)
    }

    // Handle input change
    const handleInputChange = (value) => {
        setInput(value)
        checkResults(value)
    }

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        for(let i = 0; i < results.length; i++){
            if (results[i].name === input){
               window.location.href = `hotel/${results[i].id}`;
            } else {
                console.log(`no match`)
            }
        }
    }

    return (
        <form className="head search_bar" onSubmit={(e) => handleSubmit(e)}>
            <input name="hotel_name" onChange={(e) => handleInputChange(e.target.value)} value={input} placeholder="Search for hotels" id="search_hotels" autoComplete="off"/>
            <i className="fa-solid fa-xmark close-search" onClick={() => setShowSearchBar(false)}></i>
        </form>
    );
}