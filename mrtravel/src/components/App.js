import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import './app.css';

import Navbar from './navbar';
import WelcomingPage from './welcomingpage.js';
import Resorts from './Resorts.js';
import VideoSection from './VideoSection.js';
import RelaxingPleasure from './RelaxingPleasure.js';
import Airlines from './Airlines.js';
import Dash from './Dash.js';
import Footer from './Footer.js';
import HotelDetails from './HotelDetails.js';
import AccountPage from './AccountPage.js';
import AddHotelPage from './AddHotelPage.js';
import Payment from './Payment.js';
import UpdateURL from "./UpdateURL.js";

import LoginPage from './LoginPage.js';
import Loading from "./Loading.js";

export default function App(){
  // Configure path
  const[path, setPath] = React.useState(window.location.pathname);
  const[paymentObject, setPaymentObject] = React.useState({});
  const[authenticated, setAuthenticated] = React.useState(false);
  const[isloading, setIsloading] = React.useState(true);

  // Detect url change
  let url = window.location.href;
  ['click','popstate', 'onload'].forEach( evt =>
      window.addEventListener(evt, function () {
          requestAnimationFrame(()=>{
              if (url !== location.href) {
                  setPath(window.location.pathname);
              }
              url = location.href;
          });
      }, true)
  );

  // Check if user is authenticated
  React.useEffect(() => {
      fetchData();
  }, []);

  async function fetchData() {
    try {
        const response = await fetch('/authentication');
        const data = await response.json();
        setAuthenticated(data.authenticated)
        setIsloading(false);
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  // MAIN Page
  if (path === "/"){
    return (
      <>
        <div className="intro">
          <Navbar page="home" is_login={null} isloading={isloading} setIsloading={setIsloading} />
          <WelcomingPage />
        </div>
        <div className="extra-space"></div>
        <Resorts />
        <VideoSection page="main_page" img_path='./images/3-hotel.jpg' />
        <RelaxingPleasure />
        <Airlines />
        <Dash />
        <Footer />
      </>
    );
  } 
  // Log In Page
  else if (path.slice(0, 6) === "/login"){
    if(authenticated){
      window.location.href = '/';
    }
    return(
      <LoginPage is_signup={false} />
    );
  }
  // Sign up Page
  else if (path.slice(0, 7) === "/signup"){
    if(authenticated){
      window.location.href = '/';
    }
    return(
      <LoginPage is_signup={true} />
    );
  }

  // Hotel Details Page
  else if (path.slice(0, 6) === "/hotel"){
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    console.log();
    if(path.split(/\//)[3] === 'payment'){
      
      return <Payment paymentObject={paymentObject} authenticated={authenticated}/>
    } 
    else {
      return(
        <HotelDetails authenticated={authenticated} path={path} paymentObject={paymentObject} setPaymentObject={setPaymentObject} />
      );
    }
  }

  // Account Page
  else if(path.slice(0, 8) === "/account"){
    return(
      <AccountPage setPaymentObject={setPaymentObject} />
    );
  }

  // Add Hotel Page
  else if(path.slice(0, 10) === "/add_hotel"){
    return(
      <AddHotelPage type="add" path={path}/>
    );
  }

  // Payment page
  else if(path.slice(0, 8) === "/payment"){
    return(
      <Payment paymentObject={paymentObject} authenticated={authenticated}/>
    );
  }

  // Log In Page
  else if (path.slice(0, 12) === "/edit_hotel/"){
    return(
      <AddHotelPage type="edit" path={path}/>
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