import React from "react";

// Create a URL
export default function UpdateURL(path_name){
    // Add the state to the history
    history.pushState({path: path_name}, "", `/${path_name}`)
}
