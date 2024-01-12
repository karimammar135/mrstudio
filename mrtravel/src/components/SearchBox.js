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
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/hotels/limit-1');
            const data = await response.json();
            setTotal_hotels(data.length)
            setHotels(data)
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="search_wrapper">
            <SearchBar input={input} setInput={setInput} setShowSearchBar={null} hotels={hotels} setResults={setResults} results={results} page="hotel_page"/>
            <SearchResults setInput={setInput} results={results} />
        </div>
    )
}