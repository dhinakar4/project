import React, { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PiBankFill } from "react-icons/pi";
import img from "../assets/handpick.png"
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import venuesData from "../data/venues.json";
import Filters from "./Filters";
import "./VenueList.css";
import img1 from "../assets/img1.avif";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.avif";
import img4 from "../assets/img4.avif";
import img5 from "../assets/img5.avif";

// ✅ FIX: Flatten venuesData so filter/search works
const allVenues = Array.isArray(venuesData)
  ? venuesData
  : Object.values(venuesData).flat();

function VenueList() {
  const [filteredData, setFilteredData] = useState(allVenues);
  const navigate = useNavigate();

  const toNumber = (price) => Number(price.replace(/\D/g, ""));

  const parsePax = (range) => {
    const nums = range.match(/\d+/g);
    return nums ? { min: Number(nums[0]), max: Number(nums[1]) } : { min: 0, max: 0 };
  };

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (type, valueObj) => {
    if (type === "reset") {
      setFilteredData(allVenues);
      return;
    }

    let updatedList = allVenues;
    const value = valueObj.value;

    if (type === "guests") {
      updatedList = updatedList.filter((v) => {
        const { min, max } = parsePax(v.pax_range);
        return min >= value.min && max <= value.max;
      });
    }

    if (type === "rooms") {
      updatedList = updatedList.filter(
        (v) => v.rooms >= value.min && v.rooms <= value.max
      );
    }

    if (type === "price") {
      updatedList = updatedList.filter((v) => {
        const veg = toNumber(v.veg_price);
        const nonveg = toNumber(v.nonveg_price);

        const isVegOk = veg >= value.min && veg <= value.max;
        const isNonVegOk = nonveg >= value.min && nonveg <= value.max;

        return isVegOk || isNonVegOk;
      });
    }

    if (type === "rental") {
      updatedList = updatedList.filter((v) => {
        const rental = Number(v["rental-cost"]?.replace(/\D/g, "")) || 0;
        return rental >= value.min && rental <= value.max;
      });
    }

    if (type === "type") {
      updatedList = updatedList.filter((v) =>
        v["venue-type"]?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    if (type === "space") {
      updatedList = updatedList.filter((v) =>
        v.space?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    if (type === "features") {
      updatedList = updatedList.filter((v) =>
        v.features?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    if (type === "rating") {
      updatedList = updatedList.filter((v) => v.rating >= value);
    }

    if (searchText.trim() !== "") {
      updatedList = updatedList.filter((v) =>
        v.name.toLowerCase().includes(searchText.toLowerCase()) ||
        v.city.toLowerCase().includes(searchText.toLowerCase()) ||
        v["venue-type"].toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(updatedList);
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />

      <div className="container p-3">

        <div className="text-gray-400 py-3 hover:text-pink-600" style={{ fontSize: '14px' }}
          onClick={() => navigate("/")}>Home
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span><h4>Wedding Venues</h4>
            <p className="text-sm">Showing <strong>{filteredData.length} results</strong> as per your search criteria</p>
          </span>

          <div className="relative w-full max-w-[400px]">
            <div className="search-wrapper position-relative !w-[260px]">
              <IoSearchSharp className="bi bi-search position-absolute"
                style={{
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "#8d8d8dff"
                }} />

              {/* SEARCH BOX */}
              <input
                type="text"
                className="form-control !ps-[40px] !text-sm !p-[10px]"
                placeholder="Search Wedding Venues..."
                value={searchText}
                onChange={(e) => {
                  const text = e.target.value.toLowerCase();
                  setSearchText(text);

                  if (!text) {
                    setFilteredData(allVenues);
                    return;
                  }

                  const results = allVenues.filter((v) =>
                    v.name.toLowerCase().includes(text) ||
                    v.city.toLowerCase().includes(text) ||
                    v["venue-type"].toLowerCase().includes(text)
                  );

                  setFilteredData(results);
                }}
              />

              {searchText && (
                <button className="absolute right-3 top-1/2 translate-y-1/2 text-gray-500"
                  onClick={() => {
                    setSearchText("");
                    setFilteredData(allVenues);
                  }}>
                  <i className="fa fa-times text-[14px]"></i>
                </button>
              )}
            </div>

            {/* SUGGESTION DROPDOWN */}
            {searchText && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-[350px] overflow-y-auto z-50">
                <p className="text-center text-gray-500 text-xs py-2">
                  Select a suggestion from the list below.
                </p>

                {filteredData.length > 0 ? (
                  filteredData.map((v) => (
                    <div key={v.id} className="flex items-center gap-3 hover:bg-gray-100 p-2"
                      onClick={() => navigate(`/venue/${v.id}`)}>
                      <img src={v.image} alt={v.name} className="w-14 h-14 object-cover rounded mb-1" />

                      <div>
                        <h6 className="!font-normal !text-[14px]">{v.name}</h6>
                        <p className="text-gray-500 text-xs">
                          Wedding Venues, {v.city}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No results found!</p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* TOP CITIES */}
        <div className="flex text-sm mt-3" >
          <div className="text-center">
            <img src={img2} alt="" className="link-img" />
            <p className="mt-2">Chennai</p>
          </div>
          <div className="text-center ms-5">
            <img src={img1} alt="" className="link-img" />
            <p className="mt-2">Hyderabad</p>
          </div>
          <div className="text-center ms-5">
            <img src={img3} alt="" className="link-img" />
            <p className="mt-2">Delhi</p>
          </div>
          <div className="text-center ms-5">
            <img src={img4} alt="" className="link-img" />
            <p className="mt-2">Kolkata</p>
          </div>
          <div className="text-center ms-5">
            <img src={img5} alt="" className="link-img" />
            <p className="mt-2">Mumbai</p>
          </div>
        </div>

        {/* VENUE CARDS */}
        <div className="row mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((venue) => (
              <div
                className="col-12 col-sm-6 col-lg-4 mb-2"
                key={venue.id}
                onClick={() => window.open(`/venue/${venue.name}`, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <div className="card json-card border-0 p-[10px] pb-4 hover:shadow-lg transition-all relative">

                  {/* Handpicked Badge */}
                  <div className="absolute top-[10px] left-[10px] flex items-center text-white font-semibold text-sm rounded-sm shadow-md group cursor-pointer">
                    <img src={img} alt="" />
                    <div className="tooltip-box hidden group-hover:flex absolute left-29 bg-pink-600 text-white text-xs px-2 py-2 rounded-sm shadow-xl w-[235px] z-50">
                      Handpicked showcases sponsored, top-rated vendors across budgets.
                    </div>
                  </div>

                  {/* Info Tooltip */}
                  <div className="absolute top-49 right-[20px] text-gray-500 bg-white rounded-md p-1 shadow-sm group cursor-pointer">
                    <BsFillInfoCircleFill size={15} />
                    <div className="absolute hidden group-hover:flex right-8 bottom-0 mt-2 bg-gray-100 text-black text-xs px-2 py-1 rounded-sm shadow-xl w-[240px] z-50">
                      This venue is verified and highly rated by customers.
                    </div>
                  </div>

                  {/* Image */}
                  <img src={venue.image} alt={venue.name} className="card-img-top json-img" />

                  {/* Title */}
                  <div className="d-flex pt-2">
                    <h5 className="json-title">{venue.name}</h5>

                    <span className="json-rating ms-auto d-flex">
                      <TiStarFullOutline className="mt-[2px] text-pink-600 me-1" size={20} />
                      {venue.rating}
                    </span>
                  </div>

                  {/* City + Type */}
                  <span className="nowrap json-city d-flex text-gray-500">
                    <span className="d-flex">
                      <FaLocationDot className="mt-1" />
                      {venue.city}
                    </span>

                    <PiBankFill size={18} className="mt-[2px] ms-4" />
                    <span className="ms-1 truncate max-w-[160px]">{venue["venue-type"]}</span>
                  </span>

                  {/* Prices */}
                  <span className="d-flex json-price">
                    <span className="text-gray-400 text-xs font-normal">
                      Veg
                      <p className="text-gray-700 text-lg font-bold">
                        {venue.veg_price}
                        <span className="text-xs ms-1 text-gray-600 font-normal">{venue.quantity}</span>
                      </p>
                    </span>

                    <span className="text-gray-400 text-xs ms-5 font-normal">
                      Non Veg
                      <p className="text-gray-700 text-lg font-bold">
                        {venue.nonveg_price}
                        <span className="text-xs ms-1 text-gray-600 font-normal">{venue.quantity}</span>
                      </p>
                    </span>
                  </span>

                  {/* Extras */}
                  <div className="json-extra text-xs">
                    <span className="bg-gray-100 px-2 py-1">{venue.pax_range}</span>
                    <span className="bg-gray-100 ms-2 px-2 py-1">{venue.rooms} Rooms</span>
                    <a className="ms-2 font-bold !text-gray-400">{venue.extra}</a>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center mt-4">No venues found 😕</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default VenueList;
