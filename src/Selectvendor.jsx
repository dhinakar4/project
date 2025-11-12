import { useState, useEffect, useRef } from "react";
import "./Selectvendor.css";
import { FaChevronDown } from "react-icons/fa";

function Selectvendor() {
  const [vendorOpen, setVendorOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [vendorValue, setVendorValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const vendorRef = useRef(null);
  const cityRef = useRef(null);

  const vendors = [
    "All Categories",
    "Photographer",
    "Venue",
    "Decorator",
    "Makeup Artist"
  ];

  const cities = [
    "All Cities",
    "Chennai",
    "Erode",
    "Coimbatore",
    "Salem"
  ];

  //  Filter based on search only (not selected value)
  const filteredVendors = vendors.filter((v) =>
    v.toLowerCase().includes(vendorSearch.toLowerCase())
  );
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  //  Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (vendorRef.current && !vendorRef.current.contains(e.target)) {
        setVendorOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sv-container">
      <div className="sv-center-text">
        <h2 >Your Wedding, Your Way</h2>
        <p>Find the best wedding vendors with thousands of trusted reviews</p>
      </div>

      {/* 🔹 Dropdown Search Bar */}
      <div className="sv-dropdown-bar">
        {/* Vendor Dropdown */}
        <div className="sv-dropdown-wrapper" ref={vendorRef}>
          <div
            className="sv-dropdown-field"
            onClick={() => {
              setVendorOpen(true);
              setCityOpen(false);
              setVendorSearch(""); //  show all again when reopened
            }}
          >
            <input
              type="text"
              placeholder="Select Vendor Type"
              className={`sv-dropdown-input ${
                vendorValue ? "sv-selected-text" : ""
              }`}
              value={vendorSearch || vendorValue}
              onChange={(e) => {
                setVendorSearch(e.target.value);
                setVendorOpen(true);
              }}
            />
            <FaChevronDown
              className="sv-dropdown-icon "
            />
          </div>

          {vendorOpen && (
            <div className="sv-dropdown-list">
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor, i) => (
                  <div
                    key={i}
                    className="sv-dropdown-item"
                    onClick={() => {
                      setVendorValue(vendor);
                      setVendorSearch("");
                      setVendorOpen(false);
                    }}
                  >
                    {vendor}
                  </div>
                ))
              ) : (
                <div className="sv-dropdown-item">No vendors found</div>
              )}
            </div>
          )}
        </div>

        {/* City Dropdown */}
        <div className="sv-dropdown-wrapper" ref={cityRef}>
          <div
            className="sv-dropdown-field"
            onClick={() => {
              setCityOpen(true);
              setVendorOpen(false);
              setCitySearch(""); //  show all again when reopened
            }}
          >
            <input
              type="text"
              placeholder="Select City"
              className={`sv-dropdown-input ${
                cityValue ? "sv-selected-text" : ""
              }`}
              value={citySearch || cityValue}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setCityOpen(true);
              }}
            />
            <FaChevronDown
              className="sv-dropdown-icon"
            />
          </div>

          {cityOpen && (
            <div className="sv-dropdown-list">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, i) => (
                  <div
                    key={i}
                    className="sv-dropdown-item"
                    onClick={() => {
                      setCityValue(city);
                      setCitySearch("");
                      setCityOpen(false);
                    }}
                  >
                    {city}
                  </div>
                ))
              ) : (
                <div className="sv-dropdown-item">No cities found</div>
              )}
            </div>
          )}
        </div>

        {/* Button */}
        <button className="sv-btn">Get Started</button>
      </div>

      {/* Popular Searches */}
      <div className="sv-popular">
        <strong>Popular Searches:</strong>
        <span style={{fontFamily:'serif'}}>
          Wedding Photographers in India | Bridal Makeup Artists in India | Wedding Cards in India | Wedding Venues in India
        </span>
      </div>
    </div>
  );
}

export default Selectvendor;
