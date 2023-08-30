import React from "react";
import { createRoot } from 'react-dom/client';
import './app.css';

import Navbar from './navbar';
import WelcomingPage from './welcomingpage.js';
import Resorts from './Resorts.js';
import ResortSurprises from './ResortSurprises.js';

export default function App(){

  return (
    <>
      <div className="intro">
        <Navbar />
        <WelcomingPage />
      </div>
      <div className="extra-space"></div>
      <Resorts />
      <ResortSurprises />
    </>
  );
}


const root = createRoot(document.getElementById("app")); 
root.render(<App />);