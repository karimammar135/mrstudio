import React from "react";

import './transparent_loading.css';
import './loading.css';
import { helix } from 'ldrs';

helix.register()

export default function TransparentLoading(){
    return <div className="transparent_loading loading_page">
        <div>
            <l-helix
                size="70"
                speed="2.5" 
                color="black" 
            ></l-helix>  
            <span>loading...</span>
        </div>
    </div>
}