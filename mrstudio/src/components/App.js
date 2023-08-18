import React from "react";
import { createRoot } from 'react-dom/client';
import './app.css';

import Navbar from './navbar';
import WelcomingPage from './welcomingpage.js';

export default function App(){

  return (
    <>
      <div className="intro">
        <Navbar />
        <WelcomingPage />
      </div>
      <div className="extra-space">extra space</div>
    </>
  );
}


const root = createRoot(document.getElementById("app")); 
root.render(<App />);