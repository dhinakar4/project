import React, { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PiBankFill } from "react-icons/pi";
import img from "../assets/handpick.png"
import { BsFillInfoCircleFill } from "react-icons/bs";
import venuesData from "../data/venues.json";
import Filters from "./Filters";
import "./VenueList.css";

function VenueList() {
  const [filteredData, setFilteredData] = useState(venuesData);
  const navigate = useNavigate();

  const toNumber = (price) => Number(price.replace(/\D/g, ""));

  const parsePax = (range) => {
    const nums = range.match(/\d+/g);
    return nums ? { min: Number(nums[0]), max: Number(nums[1]) } : { min: 0, max: 0 };
  };

  const handleFilterChange = (type, valueObj) => {
    if (type === "reset") {
      setFilteredData(venuesData);
      return;
    }

    let updatedList = venuesData;
    const value = valueObj.value;

    // --- GUESTS ---
    if (type === "guests") {
      updatedList = updatedList.filter((v) => {
        const { min, max } = parsePax(v.pax_range);
        return min >= value.min && max <= value.max;
      });
    }

    // --- ROOMS ---
    if (type === "rooms") {
      updatedList = updatedList.filter(
        (v) => v.rooms >= value.min && v.rooms <= value.max
      );
    }

    // --- VEG & NONVEG PRICE ---
    if (type === "price") {
      updatedList = updatedList.filter((v) => {
        const veg = toNumber(v.veg_price);
        const nonveg = toNumber(v.nonveg_price);

        const isVegOk = veg >= value.min && veg <= value.max;
        const isNonVegOk = nonveg >= value.min && nonveg <= value.max;

        return isVegOk || isNonVegOk;
      });
    }

    // --- RENTAL COST (correct JSON key rental-cost) ---
    if (type === "rental") {
      updatedList = updatedList.filter((v) => {
        const rental = Number(v["rental-cost"]?.replace(/\D/g, "")) || 0;
        return rental >= value.min && rental <= value.max;
      });
    }

    // --- VENUE TYPE ---
    if (type === "type") {
      updatedList = updatedList.filter((v) =>
        v["venue-type"]?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    // --- SPACE ---
    if (type === "space") {
      updatedList = updatedList.filter((v) =>
        v.space?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    // --- FEATURES ---
    if (type === "features") {
      updatedList = updatedList.filter((v) =>
        v.features?.toLowerCase().includes(value.trim().toLowerCase())
      );
    }

    // --- RATING ---
    if (type === "rating") {
      updatedList = updatedList.filter((v) => v.rating >= value);
    }

    setFilteredData(updatedList);
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />

      <div className="container p-5">
        <div className="row mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((venue) => (
              <div
                className="col-md-4 mb-2"
                key={venue.id}
                onClick={() => navigate(`/venue/${venue.id}`)}
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
                    <div className="absolute hidden group-hover:flex absolute right-8 bottom-0 mt-2 bg-gray-100 text-black text-xs px-2 py-1 rounded-sm shadow-xl w-[240px] z-50">
                      This venue is verified and highly rated by customers.
                    </div>
                  </div>

                  <img src={venue.image} alt={venue.name} className="card-img-top json-img" />

                  <div className="d-flex pt-2">
                    <h5 className="json-title">{venue.name}</h5>

                    <span className="json-rating ms-auto d-flex">
                      <TiStarFullOutline className="mt-[2px] text-pink-600 me-1" size={20} />
                      {venue.rating}
                    </span>
                  </div>

                  <span className="nowrap json-city d-flex text-gray-500">
                    <span className="d-flex">
                      <FaLocationDot className="mt-1" />
                      {venue.city}
                    </span>

                    <PiBankFill size={18} className="mt-[2px] ms-4" />
                    <span className="ms-1 truncate max-w-[160px]">{venue["venue-type"]}</span>
                  </span>

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
