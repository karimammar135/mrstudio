import React from "react";

// Create a URL
export default function CreateURL(url_name){
    const url_origin = window.location.origin;
    let url = `${url_origin}/${url_name}`;
    return url;
}
