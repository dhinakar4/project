// src/Home.js
import React, { useState } from "react";
import Menubar from "./Menubar";
import heroImage from './assets/homeimg.webp';
import "./Home.css";

function Home() {
  const [selectedCity, setSelectedCity] = useState("Select City");

  return (
    <div>
      <Menubar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

      {/* Hero Section */}
      <div className="hero-section">
        <img 
          src={heroImage} 
          alt="Wedding Couple" 
          className="hero-image"
        />

        {/* Display Selected City */}
        <h2 className="selected-city-text">
          {selectedCity !== "Select City" ? `You selected: ${selectedCity}` : ""}
        </h2>
      </div>
    </div>
  );
}

export default Home;
