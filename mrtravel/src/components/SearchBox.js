import React from "react";
import SearchBar from "./SearchBar.js";
import SearchResults from "./SearchResults.js";

export default function SearchBox(){
    // States
    const[total_hotels, setTotal_hotels] = React.useState(0);
    const[hotels, setHotels] = React.useState();
    const[results, setResults] = React.useState([]);
    const[input, setInput] = React.useState("");

    // Calculate Number of Hotels
    React.useEffect(() => {
        fetch('/hotels/limit-1')
        .then(response => response.json())
        .then(data => {
            setTotal_hotels(data.length)
            setHotels(data)
        })
        .catch(error => {
            alert(error)
        })
    }, []);

    return (
        <div className="search_wrapper">
            <SearchBar input={input} setInput={setInput} setShowSearchBar={null} hotels={hotels} setResults={setResults} results={results} page="hotel_page"/>
            <SearchResults setInput={setInput} results={results} />
        </div>
    )
}