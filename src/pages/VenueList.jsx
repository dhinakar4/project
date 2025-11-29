import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import venuesData from "../data/venues.json";
import "./VenueList.css";

function VenueList() {
  const [filteredData, setFilteredData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Get ?type= and ?city= from URL
  const query = new URLSearchParams(location.search);
  const type = query.get("type");
  const city = query.get("city");

  useEffect(() => {
    let data = venuesData;

    if (type) {
      data = data.filter(
        (item) =>
          item.venue-type &&
          item.venue-type.toLowerCase() === type.toLowerCase()
      );
    }

    if (city) {
      data = data.filter(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      );
    }

    setFilteredData(data);
  }, [type, city]);

  return (
    <div className="container mt-4">

      {/* Header */}
      <h3 className="mb-4">
        <strong>{filteredData.length}</strong> Venues found
      </h3>

      <div className="row">
        {filteredData.map((venue) => (
          <div
            className="col-md-4 mb-4"
            key={venue.id}
            onClick={() => navigate(`/venue/${venue.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card json-card shadow-sm">

              {/* Image */}
              <img
                src={venue.image}
                alt={venue.name}
                className="card-img-top json-img"
              />

              {/* Details */}
              <div className="card-body">

                <h5 className="json-title">{venue.name}</h5>

                <p className="json-city text-muted">
                  📍 {venue.city}
                </p>

                <p className="json-rating">
                  ⭐ {venue.rating}
                </p>

                <p className="json-price">
                  Veg: ₹{venue.veg-price} per plate <br />
                  Non-Veg: ₹{venue.nonveg-price} per plate
                </p>

                <p className="json-extra">
                  {venue.pax-range} · {venue.rooms} Rooms
                </p>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredData.length === 0 && (
        <p className="text-center mt-5">No venues found.</p>
      )}
    </div>
  );
}

export default VenueList;
