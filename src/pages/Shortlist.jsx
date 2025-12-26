import React, { useEffect, useState } from "react";
import venuesData from "../data/venues.json";
import popularsearchData from "../data/popularsearch.json";
import { Link } from "react-router-dom";

const allVenues = [...Object.values(venuesData).flat(), ...Object.values(popularsearchData).flat()];

function Shortlist() {
    const [shortlistItems, setShortlistItems] = useState([]);

    useEffect(() => {
        loadShortlist();
    }, []);

    const loadShortlist = () => {
        const shortlistIds = JSON.parse(localStorage.getItem("shortlist")) || [];
        const reversedIds = [...shortlistIds].reverse();
        const items = reversedIds
            .map((id) => allVenues.find((venue) => venue.id === id))
            .filter(Boolean);
        setShortlistItems(items);
    };

    const handleRemove = (id) => {
        // Remove ID from localStorage
        const shortlistIds = JSON.parse(localStorage.getItem("shortlist")) || [];
        const updatedIds = shortlistIds.filter((vid) => vid !== id);
        localStorage.setItem("shortlist", JSON.stringify(updatedIds));

        // Update state
        loadShortlist();
    };

    if (shortlistItems.length === 0) {
        return <h2 className="text-center mt-5">Your shortlist is empty 😕</h2>;
    }

    return (
        <div className="shortlist-container px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">My Shortlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shortlistItems.map((item) => (
                    <div key={item.id} className="shortlist-card border rounded p-4 shadow relative">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.city}</p>
                        <div className="flex justify-between mt-2">
                            <Link
                                to={`/venue/${item.id}`}
                                className="text-pink-600"
                            >
                                View Details
                            </Link>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-600 font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shortlist;
