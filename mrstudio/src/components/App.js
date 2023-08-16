import React from "react";
import { createRoot } from 'react-dom/client';

import Navbar from './navbar';

export default function App(){

  return (
    <>
      <Navbar />
    </>
  );
}


const root = createRoot(document.getElementById("app")); 
root.render(<App />);