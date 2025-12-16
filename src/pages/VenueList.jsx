import React, { useState, useEffect } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { PiBankFill } from "react-icons/pi";
import img from "../assets/handpick.png";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import venuesData from "../data/venues.json";
import Filters from "./Filters";
import "./VenueList.css";
import { TbMathGreater } from "react-icons/tb";
import { MdCancel } from "react-icons/md";

import img1 from "../assets/img1.avif";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.avif";
import img4 from "../assets/img4.avif";
import img5 from "../assets/img5.avif";

// Flatten nested JSON safely
const allVenues = Object.values(venuesData)
  .flat()
  .filter(v => v && v.name && v.id); // ensure name and id exist

const typeMapping = {
  "4star": "4star & Above Wedding Hotel",
  "banquet": "Banquet Hall",
  "garden": "Marriage Garden / Lawns",
  "3star": "3 Star Hotels with Banquets",
  "club": "Country / Golf Club",
  "resort": "Wedding Resorts",
};

function VenueList() {
  const [filteredData, setFilteredData] = useState(allVenues);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type");
  const passedTitle = location.state?.title;

  const toNumber = (price) => Number(price?.replace(/\D/g, "") || 0);
  const parsePax = (range) => {
    const nums = range?.match(/\d+/g);
    return nums ? { min: Number(nums[0]), max: Number(nums[1]) } : { min: 0, max: 0 };
  };

  const getFilteredData = () => {
    let updatedList = allVenues;

    // Filter by type
    if (selectedType && typeMapping[selectedType]) {
      const keywords = typeMapping[selectedType]
        .toLowerCase()
        .split(/[,/]/)
        .map(k => k.trim());

      updatedList = updatedList.filter((v) => {
        const types = v["venue-type"]?.toLowerCase()?.split(",").map(t => t.trim()) || [];
        return types.some(t => keywords.some(k => t.includes(k)));
      });
    }

    // Filter by search text
    if (searchText.trim() !== "") {
      const text = searchText.toLowerCase();
      updatedList = updatedList.filter(
        v =>
          v.name?.toLowerCase().includes(text) ||
          v.city?.toLowerCase().includes(text) ||
          v["venue-type"]?.toLowerCase().includes(text)
      );
    }

    return updatedList;
  };

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredData(allVenues);
      return;
    }

    setFilteredData(getFilteredData());
  }, [selectedType, searchText]);


  const handleFilterChange = (filters) => {
    let updatedList = getFilteredData();

    // 1️⃣ PAX RANGE
    if (filters.paxrange && filters.paxrange.length > 0) {
      updatedList = updatedList.filter((v) => {
        const nums = v.pax_range?.match(/\d+/g)?.map(Number) || [];
        const minPax = nums[0] || 0;
        const maxPax = nums[1] || Infinity;

        return filters.paxrange.some((range) => {
          const rNums = range.match(/\d+/g)?.map(Number) || [];
          const rMin = rNums[0] || 0;
          const rMax = rNums[1] || Infinity;

          return maxPax >= rMin && minPax <= rMax;
        });
      });
    }

    // 2️⃣ ROOMS
    if (filters.rooms && filters.rooms.length > 0) {
      updatedList = updatedList.filter((v) =>
        filters.rooms.some((range) => {
          const nums = range.match(/\d+/g)?.map(Number) || [];
          const minRooms = nums[0] || 0;
          const maxRooms = nums[1] || Infinity;
          return v.rooms >= minRooms && v.rooms <= maxRooms;
        })
      );
    }

    // 3️⃣ PRICE
    if (filters.price && filters.price.length > 0) {
      updatedList = updatedList.filter((v) =>
        filters.price.some((range) => {
          const nums = range.match(/\d+/g)?.map(Number) || [];
          const minPrice = nums[0] || 0;
          const maxPrice = nums[1] || Infinity;

          const veg = toNumber(v.veg_price);
          const nonveg = toNumber(v.nonveg_price);

          return (
            (veg >= minPrice && veg <= maxPrice) ||
            (nonveg >= minPrice && nonveg <= maxPrice)
          );
        })
      );
    }

    // 4️⃣ RENTAL
    if (filters.rental) {
      const nums = filters.rental.match(/\d+/g)?.map(Number) || [];
      const minRent = nums[0] || 0;
      const maxRent = nums[1] || Infinity;

      updatedList = updatedList.filter((v) => {
        const rent = Number(v["rental-cost"]?.replace(/\D/g, "")) || 0;
        return rent >= minRent && rent <= maxRent;
      });
    }

    // 5️⃣ TYPE
    if (filters.type && filters.type.length > 0) {
      updatedList = updatedList.filter((v) =>
        filters.type.some((t) =>
          v["venue-type"]?.toLowerCase().includes(t.toLowerCase())
        )
      );
    }

    // 6️⃣ SPACE
    if (filters.space && filters.space.length > 0) {
      updatedList = updatedList.filter((v) =>
        filters.space.some((s) =>
          v.space?.toLowerCase().includes(s.toLowerCase())
        )
      );
    }

    // 7️⃣ FEATURES
    if (filters.features && filters.features.length > 0) {
      updatedList = updatedList.filter((v) =>
        filters.features.some((f) =>
          v.features?.toLowerCase().includes(f.toLowerCase())
        )
      );
    }

    // 8️⃣ RATING
    if (filters.rating) {
      updatedList = updatedList.filter(
        (v) => (v.rating || 0) >= parseFloat(filters.rating)
      );
    }

    setFilteredData(updatedList);
  };


  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />

      <div className="container p-3 px-md-5">
        <div className="px-3">
          <div className="text-gray-400 text-sm flex gap-2">
            <span
              className="cursor-pointer  flex"
            >
              <p className="hover:text-pink-600" onClick={() => navigate("/")}>Home</p>
              <TbMathGreater className="mt-1 ml-[1px] mr-[1px]" size={14} />
              <span
                className="cursor-pointer flex"
              >
                <p className="hover:text-pink-600" onClick={() => {
                  navigate("/venues?type=all", { state: { title: "Wedding Venues" } });
                  setFilteredData(allVenues);
                }}>Wedding Venues</p>
              </span>
            </span>
          </div>


          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <span className="flex-1">
              <h4 className="!text-md !md:text-md font-semibold !text-gray-600">{passedTitle || "Wedding Venues"}</h4>
              <p className="text-sm  mt-1 text-gray-600">
                Showing <strong>{filteredData.length} results</strong>  as per your search criteria
              </p>
            </span>

            <div className="relative w-full md:w-80">
              <div className="relative w-full">
                <IoSearchSharp
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
                />

                <input
                  type="text"
                  className="w-70 border border-gray-400 font-medium rounded-lg px-10 py-2 !text-sm focus:outline-none"
                  placeholder="Search Wedding Venues..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                />

                {searchText && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setSearchText("")}
                  >
                    <i className="fa fa-times text-sm"></i>
                  </button>
                )}
              </div>

              {searchText && (
                <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  <p className="text-center text-gray-500 text-xs py-2">
                    Select a suggestion from below.
                  </p>

                  {filteredData.length > 0 ? (
                    filteredData.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center gap-3 hover:bg-gray-100 p-2 cursor-pointer"
                        onClick={() => window.open(`/venue/${v.image}`, "_blank")}
                      >
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-sm"
                        />
                        <div>
                          <h6 className="text-sm font-normal">{v.name}</h6>
                          <p className="text-gray-500 text-xs">
                            Wedding Venues, {v.city}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-2">No results found!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center !gap-2 !md:gap-3 my-4">

            {selectedType && selectedType !== "all" && (
              <div className="clear-venues px-2  py-1 px-md-3 justify-content-between font-base rounded-full border text-gray-500 text-sm md:text-xs !text-sm !md:text-xs flex items-center gap-2">
                <span>{typeMapping[selectedType]}</span>
                <button
                  onClick={() => {
                    navigate("/venues?type=all");
                    setFilteredData(allVenues);
                  }}
                >
                  <MdCancel className="text-xs md:text-sm d-block" />
                </button>
              </div>
            )}

            {(selectedType && selectedType !== "all") || searchText ? (
              <button
                className="!text-xs !md:text-sm font-semibold underline"
                onClick={() => {
                  navigate("/venues?type=all");
                  setSearchText("");
                  setFilteredData(allVenues);
                }}
              >
                Clear all
              </button>
            ) : null}
          </div>


          <div className="flex flex-wrap justify-start md:justify-start gap-4 mt-4 text-sm">
            {[img2, img1, img3, img4, img5].map((imgSrc, idx) => (
              <div key={idx} className="text-center w-20 md:w-24">
                <img
                  src={imgSrc}
                  alt=""
                  className="mx-auto w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
                />
                <p className="mt-2">{["Chennai", "Hyderabad", "Delhi", "Kolkata", "Mumbai"][idx]}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="row mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((venue) => (
              <div
                className="col-12 col-sm-6 col-lg-4 mb-2"
                key={venue.id}
                onClick={() => window.open(`/venue/${venue.id}`, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <div className="card json-card border-0 p-[10px] pb-4 hover:shadow-lg transition-all relative">

                  <div className="absolute top-[10px] left-[10px] flex items-center text-white font-semibold text-sm rounded-sm shadow-md group cursor-pointer">
                    <img src={img} alt="" />
                    <div className="tooltip-box hidden group-hover:flex absolute left-29 bg-pink-600 text-white text-xs px-2 py-2 rounded-sm shadow-xl w-[235px] z-50">
                      Handpicked showcases sponsored, top-rated vendors across budgets.
                    </div>
                  </div>

                  <div className="absolute top-49 right-[20px] text-gray-500 bg-white rounded-md p-1 shadow-sm group cursor-pointer">
                    <BsFillInfoCircleFill size={15} />
                    <div className="absolute hidden group-hover:flex right-8 bottom-0 mt-2 bg-gray-100 text-black text-xs px-2 py-1 rounded-sm shadow-xl w-[240px] z-50">
                      This venue is verified and highly rated in all cities.
                    </div>
                  </div>

                  <img src={venue?.image} alt={venue.name} className="card-img-top json-img" />

                  <div className="d-flex pt-2">
                    <h5 className="json-title">{venue.name}</h5>
                    <span className="json-rating ms-auto d-flex">
                      <TiStarFullOutline className="mt-[2px] text-pink-600 me-1" size={20} />
                      {venue.rating || 0}
                      <span className="text-gray-400 font-normal text-sm mt-[2px] ms-1">{venue.review}</span>
                    </span>
                  </div>

                  <span className="nowrap json-city d-flex text-gray-400 justify-content-between">
                    <span className="d-flex">
                      <FaLocationDot className="mt-1 me-1" />
                      {venue.city}
                    </span>
                    <span className="flex">
                      <PiBankFill className="location-icon me-1 ms-1" />
                      <span className=" truncate max-w-[210px] location-text ">{venue.location}</span>
                    </span>
                  </span>

                  <span className="d-flex json-price justify-content-md-start justify-content-between">
                    <span className="text-gray-400 text-xs font-normal">
                      Veg
                      <p className="text-gray-700 text-lg font-bold">
                        {venue.veg_price}
                        <span className="text-xs ms-1 text-gray-600 font-normal">
                          {venue.quantity}
                        </span>
                      </p>
                    </span>
                    <span className="text-gray-400 text-xs ms-2 ms-md-5 font-normal">
                      Non Veg
                      <p className="text-gray-700 text-lg font-bold">
                        {venue.nonveg_price}
                        <span className="text-xs ms-1 text-gray-600 font-normal">
                          {venue.quantity}
                        </span>
                      </p>
                    </span>
                  </span>

                  <div className="json-extra text-xs">
                    <span className="bg-gray-100 px-2 py-1">{venue.pax_range}</span>
                    <span className="bg-gray-100 ms-2 px-2 py-1">{venue.rooms} Rooms</span>
                    <span className="ms-2 font-bold !text-gray-400 underline">{venue.extra}</span>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center mt-4">No venues found 😕</h4>
          )}
        </div>
      </div>
    </div >
  );
}

export default VenueList;
