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
import DownloadApp from "./DownloadApp";
import Gallery from "./Gallery";
import FeatureVendor from "./FeatureVendor";
import LatestBlogs from "./LatestBlogs";
import ContactPage from "./ContactPage";
import { GiButterfly } from "react-icons/gi";



function Home() {
  const [selectedCity, setSelectedCity] = useState("All cities");

  return (
    <div>
      {/* <Menubar selectedCity={selectedCity} setSelectedCity={setSelectedCity} /> */}

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
      <DownloadApp />
      <RealWedding />
      <Gallery />
      <FeatureVendor />
      <LatestBlogs />
      <ContactPage />

      {/* <div className="bg-light h-13 w-full flex text-sm justify-between px-5 py-3">
        <div>
          <span className="flex text-gray-400">© <strong className="!text-gray-600">2025</strong>
            <GiButterfly className="ms-3 mt-[3px]" size={16} /> <span className="text-xs ms-[2px] mt-[3px]">Wed<strong>Me</strong>Good</span>
          </span>
        </div>
        <div>
          <span className="font-semibold">Terms & Conditions | Privacy Policy</span>
        </div>
      </div> */}
      
    </div>
  );
}

export default Home;
