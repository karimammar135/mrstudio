import React from "react";

import './SearchResults.css';

export default function SearchResults({ results, setInput }){

    return <div className="results-container">
        {
            results.map((result, id) => {
                return <div key={id} onClick={() => setInput(result.name)}>{result.name}</div>
            })
        }
    </div>
}