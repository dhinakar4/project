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

      <div className="bg-light w-full text-sm px-4 sm:!px-[50px] py-3">
        <div className="flex flex-col gap-2 text-center min-[375px]:flex-row min-[375px]:items-center min-[375px]:justify-between min-[425px]:text-left">

          {/* Left */}
          <div className="flex justify-center sm:justify-start text-gray-400">
            <span className="flex items-center">
              © <strong className="mx-1 !text-gray-600">2025</strong>
              <GiButterfly className="mx-2" size={16} />
              <span className="text-xs">
                Wed<strong>Me</strong>Good
              </span>
            </span>
          </div>

          {/* Right */}
          <div className="font-semibold text-gray-600">
            <span className="block sm:inline">Terms & Conditions</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span className="block sm:inline">Privacy Policy</span>
          </div>

        </div>
      </div>


    </div>
  );
}

export default Home;
