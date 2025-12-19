import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown, IoMdFunnel } from "react-icons/io";
import "./Filters.css";

function Filters({ onFilterChange }) {

  const [activeMobileFilter, setActiveMobileFilter] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // sidebar for mobile
  const [showAllFilters, setShowAllFilters] = useState(false); // show full panel for desktop
  const [selectedFilters, setSelectedFilters] = useState({
    paxrange: [],
    rooms: [],
    price: [],
    rental: null,
    type: [],
    space: [],
    features: [],
    rating: null,
  });

  const dropdownRef = useRef(null);

  const filters = [
    { label: "No. of Guests", key: "paxrange" },
    { label: "Room Count", key: "rooms" },
    { label: "Price per plate (Rs)", key: "price" },
    { label: "Rental Cost", key: "rental" },
    { label: "Venue Type", key: "type" },
    { label: "Space", key: "space" },
    { label: "Features", key: "features" },
    { label: "Rating", key: "rating" },
  ];

  const options = {
    paxrange: ["<100", "100-250", "250-500", "500-1000", ">1000"],
    rooms: ["<30", "31-60", "61-100", "101-150", "151-200", "200+"],
    price: ["<1000", "1000-1500", "1500-2000", "2000-3000", ">3000"],
    rental: [
      "< ₹1 Lakh",
      "₹1 Lakh - ₹2 Lakhs",
      "₹2 Lakhs - ₹4 Lakhs",
      "₹4 Lakhs - ₹6 Lakhs",
      "> ₹6 Lakhs",
    ],
    type: [
      "Banquet Halls",
      "4 Star Hotels",
      "Marriage Garden",
      "3 Star Hotels ",
    ],
    space: ["Indoor", "Outdoor", "Poolside", "Terrace / Rooftop"],
    features: ["Beach view", "Mountain view", "Lake view", "Sea view", "Pet Friendly"],
    rating: ["4", "4.5", "4.8"],
  };

  const handleFilterClick = () => {
    setShowAllFilters((prev) => !prev);
  };

  const handleChange = (filterKey, option) => {
    if (["rental", "rating"].includes(filterKey)) {
      setSelectedFilters((prev) => ({ ...prev, [filterKey]: option }));
    } else {
      setSelectedFilters((prev) => {
        const current = prev[filterKey] || [];
        return {
          ...prev,
          [filterKey]: current.includes(option)
            ? current.filter((o) => o !== option)
            : [...current, option],
        };
      });
    }
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
    setShowAllFilters(false);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const cleared = {
      paxrange: [],
      rooms: [],
      price: [],
      rental: null,
      type: [],
      space: [],
      features: [],
      rating: null,
    };
    setSelectedFilters(cleared);
    onFilterChange(cleared);
    setShowAllFilters(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".wmg-filter-item")
      ) {
        setShowAllFilters(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isChecked = (filterKey, option) => {
    if (["rental", "rating"].includes(filterKey)) {
      return selectedFilters[filterKey] === option;
    }
    return selectedFilters[filterKey]?.includes(option);
  };

  return (
    <div className="wmg-filter-wrapper shadow-sm">
      {/* Mobile Filter Button */}
      <div className="mobile-filter-btn d-lg-none">
        <button onClick={() => setIsOpen(!isOpen)}>
          <IoMdFunnel size={22} /> Filter
        </button>
      </div>

      {/* Desktop / Laptop Filters */}
      <div className="wmg-filter-container d-none d-lg-flex">
        {filters.map((f) => (
          <div
            key={f.key}
            className="wmg-filter-item"
            onClick={handleFilterClick}
          >
            {f.label}
            <IoMdArrowDropdown size={20} className="mt-1 transition-all" />
          </div>
        ))}
      </div>

      {/* Full Filter Panel for Desktop */}
      {showAllFilters && (
        <div className="wmg-full-panel !text-sm" ref={dropdownRef}>
          {filters.map((f) => (
            <div className="wmg-section" key={f.key}>
              {options[f.key].map((item) => (
                <label key={item} className="filter-items">
                  <input
                    type={["rental", "rating"].includes(f.key) ? "radio" : "checkbox"}
                    name={["rental", "rating"].includes(f.key) ? f.key : undefined}
                    checked={isChecked(f.key, item)}
                    onChange={() => handleChange(f.key, item)}
                  />
                  {item}
                </label>
              ))}

              {/* Add buttons inside rating column */}
              {f.key === "rating" && (
                <div className="wmg-btn-col mt-4 ms-5">
                  <button className="btn btn-sm btn-danger" onClick={clearFilters}>
                    Clear
                  </button>
                  <button className="btn btn-sm btn-primary " onClick={applyFilters}>
                    Apply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}


      {/* Mobile Filter Sidebar */}
      {isOpen && (
        <div className="mobile-filter-sidebar" ref={dropdownRef}>

          {/* Header */}
          <div className="mobile-filter-header">
            {activeMobileFilter ? (
              <button
                className="back-btn"
                onClick={() => setActiveMobileFilter(null)}
              >
                ← Filters
              </button>
            ) : (
              <h6>Types of Filters </h6>
            )}
          </div>

          {/* STEP 1: Filter Titles */}
          {!activeMobileFilter && (
            <div className="mobile-filter-categories">
              {filters.map((f) => (
                <div
                  key={f.key}
                  className="mobile-filter-category"
                  onClick={() => setActiveMobileFilter(f.key)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Filter Options */}
          {activeMobileFilter && (
            <div className="mobile-filter-options">
              <h5 className="mb-3">
                {filters.find(f => f.key === activeMobileFilter)?.label}
              </h5>

              {options[activeMobileFilter].map((item) => (
                <label key={item}>
                  <input
                    type={["rental", "rating"].includes(activeMobileFilter) ? "radio" : "checkbox"}
                    name={["rental", "rating"].includes(activeMobileFilter) ? activeMobileFilter : undefined}
                    checked={isChecked(activeMobileFilter, item)}
                    onChange={() => handleChange(activeMobileFilter, item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="mobile-filter-footer">
            <button className="btn btn-sm btn-danger" onClick={clearFilters}>
              Clear
            </button>
            <button className="btn btn-sm btn-primary ms-2" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Filters;
