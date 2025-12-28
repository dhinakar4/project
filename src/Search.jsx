import { useState } from "react";
import Menubar from "./Menubar";
import "./Search.css";
import { FaChevronDown, FaImages } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiButterfly } from "react-icons/gi";
import { RiArticleFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



function Search() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState("All");
    const navigate = useNavigate();


    const handleSelect = (option) => {
        setSelected(option);
        setDropdownOpen(false);
    };

    const options = [
        { label: "All", icon: <GiButterfly /> },
        { label: "Vendors", icon: <SiHomeassistantcommunitystore /> },
        { label: "Photos", icon: <FaImages /> },
        { label: "Articles", icon: <RiArticleFill /> },
    ];

    const popularSearches = [
        "Engagement gown",
        "Mandap decor",
        "Bridal Hairstyles",
        "Bridal entry songs",
        "Bridal Makeup in Delhi",
        // "Bridal Makeup in Mumbai",
    ];

    return (
        <div>
            <div className="heading">
                <div className="home-button">
                    {/* 🔹 Close Icon */}
                    <AiOutlineClose
                        size={28}
                        className="close-icon"
                        onClick={() => navigate("/")}
                        title="Go back home"
                    />
                </div>
                <h4 className="dream-wedding">
                    Everything you need, to plan your dream Wedding!
                </h4>
                <p className="subheading">
                    Search for vendors, ideas, real wedding stories and more!
                </p>

                <div className="searchbar-container">
                    <div
                        className="dropdown-wrapper"
                        onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
                        onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
                        onClick={() => {
                            // For mobile/tablet toggle on click
                            if (window.innerWidth <= 768) {
                                setDropdownOpen((prev) => !prev);
                            }
                        }}
                    >
                        <button className="dropdown-btn">
                            <GiButterfly size={20} className="dropdown-icon " />
                            <span className="me-auto">All</span>
                            <FaChevronDown className="dropdown-arrow" />
                        </button>

                        {dropdownOpen && (
                            <div className="dropdown-menu show">
                                {options.map((item, i) => (
                                    <div
                                        key={i}
                                        className="dropdown-item"
                                        onClick={() => handleSelect(item.label)}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        type="search"
                        placeholder="Search: Vendors, Photos, Articles"
                        className="custom-search-input"
                    />
                </div>

                <div className="popular-searches">
                    <h5>Popular Searches</h5>
                    <div className="tags-container ">
                        {popularSearches.map((item, index) => (
                            <span key={index} className="tag">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bottom">
                    <GiButterfly className="pink" size={25} /> <br />
                    <p className="color">India's favorite wedding planning platform.</p>
                </div>

            </div>
        </div>
    );
}

export default Search;
