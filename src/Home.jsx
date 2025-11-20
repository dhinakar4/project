import React, { useState } from "react";
import Menubar from "./Menubar";
import heroImage from './assets/homeimg.webp';
import "./Home.css";
import Selectvendor from "./Selectvendor";
import VenueSearch from "./VenueSearch";
import PopularSearch from "./PopularSearch";
import WeddingCategories from "./WeddingCategories";
import WMGservice from "./WMGservice";
import RealWedding from "./RealWedding";


function Home() {
  const [selectedCity, setSelectedCity] = useState("All cities");

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
        <div className="hero-overlay">
          <Selectvendor />
        </div>
      </div>

      <VenueSearch />
      <PopularSearch />
      <WeddingCategories />
      <WMGservice />
      <RealWedding />
    </div>
  );
}

export default Home;
