import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import './app.css';

import Navbar from './navbar';
import WelcomingPage from './welcomingpage.js';
import Resorts from './Resorts.js';
import ResortSurprises from './ResortSurprises.js';
import RelaxingPleasure from './RelaxingPleasure.js';
import Airlines from './Airlines.js';
import Dash from './Dash.js';
import Footer from './Footer.js';

import LoginPage from './LoginPage.js';

export default function App(){
  // Configure path
  let path_name = window.location.pathname;

  // MAIN Page
  if (path_name === "/"){
    return (
      <>
        <div className="intro">
          <Navbar page="home" />
          <WelcomingPage />
        </div>
        <div className="extra-space"></div>
        <Resorts />
        <ResortSurprises />
        <RelaxingPleasure />
        <Airlines />
        <Dash />
        <Footer />
      </>
    );
  } 
  // Log In Page
  else if (path_name === "/login"){
    return(
      <LoginPage />
    );
  }
  else {
    return (
      <div>No page found</div>
    );
  }
}


const root = createRoot(document.getElementById("app")); 
root.render(<App />);