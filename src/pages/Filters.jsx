import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Filters.css";

function Filters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
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
    rental: ["< ₹1 Lakh", "₹1 Lakh - ₹2 Lakhs", "₹2 Lakhs - ₹4 Lakhs", "₹4 Lakhs - ₹6 Lakhs", "> ₹6 Lakhs"],
    type: ["Banquet Halls", "4 Star & Above Wedding Hotels", "Marriage Garden", "3 Star Hotels with Banquets"],
    space: ["Indoor", "Outdoor", "Poolside", "Terrace / Rooftop"],
    features: ["Beach view", "Mountain view", "Lake view", "Sea view", "Pet Friendly"],
    rating: ["4", "4.5", "4.8"],
  };

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

  const handleFilterClick = (key) => {
    setActiveFilter(activeFilter === key && isOpen ? null : key);
    setIsOpen(activeFilter !== key || !isOpen);
  };

  const handleChange = (filterKey, option) => {
    if (["rental", "rating"].includes(filterKey)) {
      // Single selection (radio)
      setSelectedFilters((prev) => ({ ...prev, [filterKey]: option }));
    } else {
      // Multiple selection (checkbox)
      setSelectedFilters((prev) => {
        const current = prev[filterKey] || [];
        if (current.includes(option)) {
          return { ...prev, [filterKey]: current.filter((o) => o !== option) };
        } else {
          return { ...prev, [filterKey]: [...current, option] };
        }
      });
    }
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
    setIsOpen(false);
    setActiveFilter(null);
  };

  const clearFilters = () => {
    setSelectedFilters({
      paxrange: [],
      rooms: [],
      price: [],
      rental: null,
      type: [],
      space: [],
      features: [],
      rating: null,
    });
    onFilterChange({});
    setIsOpen(false);
    setActiveFilter(null);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".wmg-filter-item")
      ) {
        setIsOpen(false);
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isChecked = (filterKey, option) => {
    if (["rental", "rating"].includes(filterKey)) return selectedFilters[filterKey] === option;
    return selectedFilters[filterKey]?.includes(option);
  };

  return (
    <div className="wmg-filter-wrapper shadow-sm">
      <div className="wmg-filter-container">
        
        {filters.map((f) => (
          <div
            key={f.key}
            className={`wmg-filter-item ml-[38px] ${activeFilter === f.key ? "active" : ""}`}
            onClick={() => handleFilterClick(f.key)}
          >
            {f.label}
            <IoMdArrowDropdown
              size={20}
              className={`mt-1 transition-all ${activeFilter === f.key ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="wmg-sections-row ms-5" ref={dropdownRef}>
          {filters.map((f) => (
            <div key={f.key} className="wmg-section">
              {options[f.key].map((item) => (
                <label key={item}>
                  <input
                    type={["rental", "rating"].includes(f.key) ? "radio" : "checkbox"}
                    name={["rental", "rating"].includes(f.key) ? f.key : undefined}
                    checked={isChecked(f.key, item)}
                    onChange={() => handleChange(f.key, item)}
                  />
                  {item}
                </label>
              ))}

              {f.key === "rating" && (
                <div className="wmg-btn-col mt-4">
                  <button className="btn btn-sm btn-danger" onClick={clearFilters}>
                    Clear
                  </button>
                  <button className="btn btn-sm btn-primary ms-2" onClick={applyFilters}>
                    Search
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filters;
