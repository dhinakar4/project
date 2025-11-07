// src/CityDropdown.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./CityDropdown.css";
import { IoMdSearch } from "react-icons/io";

function CityDropdown({ show, close, onCitySelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!show) return null;

  const handleCityClick = (city) => {
    onCitySelect(city);
    close();
  };

  return (
    <div className="city-dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
      <div className="city-dropdown shadow-lg">
        <div className="search-input-wrapper pt-4">
          <div className="input-with-icon">
            <IoMdSearch className="search-icon" />
            <Form.Control
              className="form-control search-input"
              type="text"
              placeholder="Search City, State..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="dropdown-columns">
          <div className="column">
            <h6>Top Cities</h6>
            <ul>
              <li><button onClick={() => handleCityClick("All cities")}>All cities</button></li>
              <li><button onClick={() => handleCityClick("Coimbatore")}>Coimbatore</button></li>
            </ul>
          </div>

          <div className="column">
            <h6>Popular Cities</h6>
            <ul>
              <li><button onClick={() => handleCityClick("Erode")}>Erode</button></li>
            </ul>
          </div>

          <div className="column">
            <h6>Other Cities</h6>
            <ul>
              <li><button onClick={() => handleCityClick("Chennai")}>Chennai</button></li>
            </ul>
          </div>

          <div className="column">
            <h6>States</h6>
            <ul>
              <li><button onClick={() => handleCityClick("Kerala")}>Kerala</button></li>
            </ul>
            <h6 className="mt-3">International Cities</h6>
            <ul>
              <li><button onClick={() => handleCityClick("Dubai")}>Dubai</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityDropdown;
