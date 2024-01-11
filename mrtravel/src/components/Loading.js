import React from "react";
import { helix } from 'ldrs'

helix.register()

import './loading.css';

export default function Loading(){
    return <section className="loading_page">
        <div>
            <l-helix
                size="70"
                speed="2.5" 
                color="black" 
            ></l-helix>  
            <span>loading...</span>
        </div>
    </section>
}