import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Filters.css";

function Filters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const dropdownRef = useRef(null);

  const filters = [
    { label: "No. of Guests", key: "guests" },
    { label: "Room Count", key: "rooms" },
    { label: "Price per plate (Rs)", key: "price" },
    { label: "Rental Cost", key: "rental" },
    { label: "Venue Type", key: "type" },
    { label: "Space", key: "space" },
    { label: "Features", key: "features" },
    { label: "Rating", key: "rating" },
  ];

  const options = {
    guests: ["<100", "100-250", "250-500", "500-1000", ">1000"],

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
      "4 Star & Above Wedding Hotels",
      "5 Star Hotels",
      "3 Star Hotels with Banquets",
    ],

    space: ["Indoor", "Outdoor", "Poolside", "Terrace / Rooftop"],

    features: [
      "Beach view",
      "Mountain view",
      "Lake view",
      "Sea view",
      "Pet Friendly",
    ],

    rating: ["4", "4.5", "4.8"],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    guests: null,
    rooms: null,
    price: null,
    rental: null,
    type: null,
    space: null,
    features: null,
    rating: null,
  });

  const parseRange = (text) => {
    if (text.includes("Lakh")) {
      const nums = text.match(/\d+/g).map(Number);

      if (text.startsWith("<")) return { min: 0, max: nums[0] * 100000 };
      if (text.startsWith(">")) return { min: nums[0] * 100000, max: Infinity };
      return { min: nums[0] * 100000, max: nums[1] * 100000 };
    }

    const nums = text.match(/\d+/g)?.map(Number) || [];

    if (nums.length === 1) {
      const val = nums[0];
      if (text.startsWith("<")) return { min: 0, max: val };
      if (text.startsWith(">")) return { min: val, max: Infinity };
      return { min: val, max: val };
    }

    return { min: nums[0], max: nums[1] };
  };

  const handleFilterClick = (key) => {
    if (activeFilter === key) setIsOpen(!isOpen);
    else {
      setActiveFilter(key);
      setIsOpen(true);
    }
  };

  const updateSelected = (key, val) =>
    setSelectedFilters((prev) => ({ ...prev, [key]: val }));

  const applyFilters = () => {
    Object.entries(selectedFilters).forEach(([key, val]) => {
      if (val) onFilterChange(key, val);
    });
    setIsOpen(false);
    setActiveFilter(null);
  };

  const clearFilters = () => {
    setSelectedFilters({
      guests: null,
      rooms: null,
      price: null,
      rental: null,
      type: null,
      space: null,
      features: null,
      rating: null,
    });

    onFilterChange("reset", null);
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

  return (
    <div className="wmg-filter-wrapper shadow-sm">
      <div className="wmg-filter-container">
        {filters.map((f) => (
          <div
            key={f.key}
            className={`wmg-filter-item ml-[38px] ${
              activeFilter === f.key ? "active" : ""
            }`}
            onClick={() => handleFilterClick(f.key)}
          >
            {f.label}
            <IoMdArrowDropdown
              size={20}
              className={`mt-1 transition-all ${
                activeFilter === f.key ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="wmg-sections-row  ms-5" ref={dropdownRef}>
          {filters.map((f) => (
            <div
              key={f.key}
              className={`wmg-section  ${
                f.key === "rating" ? "rating-section" : ""
              }`}
            >
              {options[f.key].map((item) => (
                <label key={item}>
                  <input
                    type={
                      ["rental", "rating"].includes(f.key)
                        ? "radio"
                        : "checkbox"
                    }
                    name={
                      ["rental", "rating"].includes(f.key) ? f.key : undefined
                    }
                    checked={selectedFilters[f.key]?.label === item}
                    onChange={() => {
                      if (["rental", "rating"].includes(f.key)) {
                        const value =
                          f.key === "rating" ? Number(item) : parseRange(item);

                        updateSelected(f.key, { label: item, value });
                        return;
                      }

                      if (selectedFilters[f.key]?.label === item) {
                        updateSelected(f.key, null);
                        return;
                      }

                      const value =
                        ["type", "space", "features"].includes(f.key)
                          ? item
                          : parseRange(item);

                      updateSelected(f.key, { label: item, value });
                    }}
                  />
                  {item}
                </label>
              ))}

              {f.key === "rating" && (
                <div className="wmg-btn-col mt-4">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={applyFilters}
                  >
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
