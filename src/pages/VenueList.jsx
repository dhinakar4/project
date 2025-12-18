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

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.avif";
import img7 from "../assets/img7.jpg";

const cities = [
  "Chennai",
  "Coimbatore",
  "Bangalore",
  "Cochin",
  "Mysore",
  "Madurai",
  "Thrissur",
];

const typeToJsonKey = {
  "4star": "4star Hotels",
  "banquet": "Banquet Halls",
  "garden": "Marriage Garden",
  "3star": "3star Hotels",
  "club": "Country",
  "resort": "Wedding Resorts",
};


const typeMapping = {
  "4star": "4 Star & Above Wedding Hotels",
  "banquet": "Banquet Halls",
  "garden": "Marriage Garden",
  "3star": "3 Star Hotels with Banquets",
  "club": "Country / Golf Club",
  "resort": "Wedding Resorts",
};

const allVenues = Object.values(venuesData)
  .flat()
  .filter(v => v?.id && v?.name);

const toNumber = (val) => Number(val?.replace(/\D/g, "")) || 0;

const parseRange = (range) => {
  if (!range) return { min: 0, max: Infinity };

  if (range.includes("<")) {
    return { min: 0, max: Number(range.replace(/\D/g, "")) };
  }

  if (range.includes(">") || range.includes("+")) {
    return { min: Number(range.replace(/\D/g, "")), max: Infinity };
  }

  const nums = range.match(/\d+/g)?.map(Number) || [];
  return { min: nums[0], max: nums[1] || nums[0] };
};

const parseLakhs = (text) => {
  const nums = text.match(/\d+/g)?.map(Number) || [];
  return {
    min: (nums[0] || 0) * 100000,
    max: (nums[1] || Infinity) * 100000,
  };
};

function VenueList() {
  const [filteredData, setFilteredData] = useState(allVenues);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const passedTitle = location.state?.title;

  const allWeddingVenues = Object.values(venuesData).flat();

  const params = new URLSearchParams(location.search);
  const selectedCity = params.get("city");

  const selectedType = params.get("type");

  const selectedKey = typeToJsonKey[selectedType];

  const baseData =
    selectedType && selectedKey
      ? venuesData[selectedKey] || []
      : allWeddingVenues;


  const getBaseData = () => {
    let data = [...allVenues];

    if (selectedType && selectedType !== "all") {
      data = data.filter(v =>
        v["venue-type"]?.toLowerCase().includes(
          typeMapping[selectedType]?.toLowerCase().split(" ")[0]
        )
      );
    }

    if (selectedCity) {
      data = data.filter(
        (v) => v.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      data = data.filter( (v) =>
        v.name?.toLowerCase().includes(text) ||
        v.city?.toLowerCase().includes(text) ||
        v["venue-type"]?.toLowerCase().includes(text)
      );
    }

    return data;
  };

  useEffect(() => {
    setFilteredData(getBaseData());
  }, [searchText, selectedCity, selectedType]);

  const handleFilterChange = (filters) => {
    let updated = getBaseData();

    if (filters.paxrange?.length) {
      updated = updated.filter(v => {
        const venue = parseRange(v.pax_range);
        return filters.paxrange.some(r => {
          const selected = parseRange(r);
          return venue.max >= selected.min && venue.min <= selected.max;
        });
      });
    }

    if (filters.rooms?.length) {
      updated = updated.filter(v =>
        filters.rooms.some(r => {
          const { min, max } = parseRange(r);
          return v.rooms >= min && v.rooms <= max;
        })
      );
    }

    if (filters.price?.length) {
      updated = updated.filter(v =>
        filters.price.some(r => {
          const { min, max } = parseRange(r);
          const veg = toNumber(v.veg_price);
          const nonveg = toNumber(v.nonveg_price);
          return (
            (veg >= min && veg <= max) ||
            (nonveg >= min && nonveg <= max)
          );
        })
      );
    }

    if (filters.rental) {
      const { min, max } = parseLakhs(filters.rental);
      updated = updated.filter(v => {
        const rent = toNumber(v["rental-cost"]);
        return rent >= min && rent <= max;
      });
    }

    if (filters.type?.length) {
      updated = updated.filter(v =>
        filters.type.some(t =>
          v["venue-type"]?.toLowerCase().includes(t.toLowerCase())
        )
      );
    }

    if (filters.space?.length) {
      updated = updated.filter(v =>
        filters.space.some(s =>
          v.space?.toLowerCase().includes(s.toLowerCase())
        )
      );
    }

    if (filters.features?.length) {
      updated = updated.filter(v =>
        filters.features.some(f =>
          v.features?.toLowerCase().includes(f.toLowerCase())
        )
      );
    }

    if (filters.rating) {
      updated = updated.filter(
        v => Number(v.rating || 0) >= Number(filters.rating)
      );
    }

    setFilteredData(updated);
  };

  useEffect(() => {
    setFilteredData(baseData);
  }, [selectedType]);



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
              <div className="relative w-full right-3 md:right-0">
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
              <div className="clear-venues px-2 py-1 font-base rounded-full border text-gray-500 text-xs md:text-sm flex items-center gap-1">
                <span className="ms-1">{typeMapping[selectedType]}</span>
                <button
                  onClick={() => {
                    navigate(selectedCity ? `/venues?city=${selectedCity}`: "/venues");
                  }}
                >
                  <MdCancel className="text-sm d-block" />
                </button>
              </div>
            )}

            {selectedCity &&(
            <div className=" px-2 py-1 rounded-full border font-base text-gray-500 text-xs md:text-sm flex items-center gap-1">
            <span className="ms-1">{selectedCity}</span>
            <button onClick={() => {
            navigate(selectedType ? `/venues?type=${selectedType}` : "/venues" ); }}>
            <MdCancel className="text-sm d-block" />
            </button>
            </div>
            )}

            {(selectedType || selectedCity || searchText !== "all") && (
              <button
                className="!text-xs !md:text-sm font-semibold underline"
                onClick={() => {
                  navigate("/venues?type=all");
                  setSearchText("");
                  setFilteredData(allVenues);
                }}
              >
                <span className="block">Clear all</span>
              </button>
            )}
          </div>


          <div className="flex flex-wrap justify-start gap-2 gap-md-4 mt-4 text-sm">
            {[img1, img2, img3, img4, img5, img6, img7].map((imgSrc, idx) => (
              <div key={idx} className="text-center w-20 md:w-24">
                <img
                  src={imgSrc}
                  alt={cities[idx]}
                  className="mx-auto w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
                />
                <p
                  className="mt-2 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                  onClick={() =>
                    navigate(`/venues?city=${encodeURIComponent(cities[idx])}`, {
                      state: { title: cities[idx] },
                    })
                  }
                >
                  {cities[idx]}
                </p>
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
