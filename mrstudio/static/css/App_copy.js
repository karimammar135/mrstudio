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
  const[state, setState] = React.useState({
    page: "home"
  });

  const url_origin = window.location.origin;

  console.log(state.page);

  const onPop = (e) => {
    setState({
      page: e.state.page
    })
  }

  React.useEffect(() => {
    window.history.pushState({page: 'home'}, '', 'home');
  }, []);

  React.useEffect(() => {
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [onPop])

  // handle push state
  const showPage = (page) => {
    window.history.pushState({page: page}, '', page);
    setState({
      page: page
    })
  }

  // MAIN Page
  if (state.page === "home"){
    return (
      <>
        <div className="intro">
          <Navbar showPage={showPage} page="home" />
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
  else if (state.page === "login"){
    return(
      <LoginPage showPage={showPage} />
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