import { useParams, useNavigate } from "react-router-dom";
import venuesData from "../data/venues.json";
import { TiStarFullOutline } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { ImPencil } from "react-icons/im";
import { GoShareAndroid } from "react-icons/go";
import { TbMathGreater } from "react-icons/tb";
import img from "../assets/handpicked.avif";
import "./VenueDetails.css";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const allVenues = Object.values(venuesData).flat();

function VenueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const venue = allVenues.find((v) => String(v.id) === String(id));
    if (!venue) return <h1 className="text-center mt-10">Venue Not Found</h1>;

    return (
        <div className="px-5 mt-4 flex gap-3 justify-content-center">
            <div className="w-[50%]">
                {/* Breadcrumb */}
                <div className="text-gray-500 text-sm flex gap-2 mb-3">
                    <span onClick={() => navigate("/")} className="hover:text-pink-600 cursor-pointer">
                        Home
                    </span>
                    <TbMathGreater className="mt-1" size={12} />
                    <span onClick={() => navigate("/venues?type=all")} className="hover:text-pink-600 cursor-pointer">
                        Wedding Venues
                    </span>
                    <TbMathGreater className="mt-1" size={12} />
                    <span className="hover:text-pink-600 cursor-pointer">
                        Wedding Venues {venue.city}
                    </span>
                </div>

                <div className="relative">

                    <div className="absolute  z-10 group cursor-pointer">
                        <img src={img} alt="" className="" />
                        <div className="hidden group-hover:block absolute bg-orange-500 text-white text-xs p-2 rounded shadow-xl w-[180px] bottom-1 left-10">
                            Showcases sponsored, top rated vendors across budgets
                        </div>
                    </div>

                    <img src={venue.image} className="w-full rounded shadow-sm" />

                    <div className="absolute left-6 right-6 top-85 bg-white shadow-md rounded">

                        <div className="flex items-center px-4 pt-3">
                            <h4 className="!text-gray-600 font-semibold">{venue.name}</h4>
                            <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-sm flex items-center gap-1">
                                <TiStarFullOutline /> {venue.rating}
                            </span>
                        </div>

                        {/* Location */}
                        <div className="flex text-gray-600 mt-1 items-start px-4 ">
                            <FaLocationDot className="text-gray-600 mt-[3px]" />
                            <div className="ml-1">
                                <strong className="!text-md">{venue.city}</strong> <span className="text-sm">(View on Map)</span>
                                <div className="text-gray-500 text-sm">{venue.area}, India</div>
                            </div>

                            <span className="ml-auto text-md">{venue.review}</span>
                        </div>

                        {/* Contact */}
                        <div className="flex text-green-600 mt-3 font-medium text-md px-4">
                            <MdCall size={18} className="mr-1 mt-1" />
                            Contact
                        </div>

                        <div className="flex items-center justify-between mt-6 bg-gray-50 border-gray-200 text-sm py-3 px-4">

                            {/* Photos */}
                            <div className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <HiPhoto size={18} />
                                <span>22 Photos</span>
                            </div>

                            {/* Divider */}
                            <div className="h-6 w-[1px] bg-gray-300"></div>

                            {/* Shortlist */}
                            <div className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <IoIosHeartEmpty size={18} />
                                <span>Shortlist</span>
                            </div>

                            <div className="h-6 w-[1px] bg-gray-300"></div>

                            {/* Review */}
                            <div className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <ImPencil size={16} />
                                <span>Write a Review</span>
                            </div>

                            <div className="h-6 w-[1px] bg-gray-300"></div>

                            {/* Share */}
                            <div className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <GoShareAndroid size={18} />
                                <span>Share</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-45 bg-white shadow-sm border border-light p-[15px] flex gap-8 text-md">
                    <span className="cursor-pointer">Banquets</span>
                    <span className="cursor-pointer">Projects</span>
                    <span className="cursor-pointer">About</span>
                    <span className="cursor-pointer">Reviews</span>
                </div>

                {/* Areas Available */}
                <div className="bg-white shadow-sm border mt-4 p-[13px] text-2xl">
                    Areas Available
                </div>
            </div>

            <div className="w-[35%] mt-[32px]">

                <div className="bg-white shadow-md rounded-md py-2 border">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-300 px-4 py-3">
                        <h6 className="text-lg font-semibold">Local Price</h6>

                        {/* Only the arrow toggles */}
                        <span
                            className="text-pink-600 text-sm cursor-pointer flex items-center gap-1"
                            onClick={() => setOpen(!open)}
                        >
                            Pricing Info
                            {open ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                        </span>
                    </div>

                    {/* DROPDOWN CONTENT */}
                    {open && (
                        <div className="grid grid-cols-2 mt-3 px-4 border-b border-gray-300">
                            <div>
                                <p className="font-medium text-sm">Room Price</p>
                                <p className="text-gray-500 text-sm">₹ 6,500 per room</p>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Starting Price of Decor</p>
                                <p className="text-gray-500 text-sm">₹ 60,000</p>
                            </div>
                        </div>
                    )}

                    {/* Veg price */}
                    <div className="flex justify-between items-center px-4 border-b border-gray-300">
                        <p className="mt-2">
                            <span className="text-pink-600 font-semibold text-xl ">₹ 1,650</span>
                            <span className="text-gray-500 text-sm"> per plate (taxes extra)</span>
                        </p>
                        <span className="text-gray-500 text-sm">Veg price</span>
                    </div>

                    {/* Non-Veg price */}
                    <div className="flex justify-between items-center px-4">
                        <p className="mt-2">
                            <span className="text-pink-600 font-semibold text-xl">₹ 1,750</span>
                            <span className="text-gray-500 text-sm"> per plate (taxes extra)</span>
                        </p>
                        <span className="text-gray-500 text-sm">Non Veg price</span>
                    </div>
                </div>



                {/* Destination Price */}
                <div className="bg-red-100 shadow-md rounded mt-4 py-3">
                    <span className="px-4 ">Destination Price</span> <hr />
                    <div className="text-3xl font-semibold text-gray-900 flex justify-content-between px-4">₹22.50 Lakhs
                        <div className="text-sm text-gray-500 ">/day for 73 rooms<br /> (Incl. Rooms + Meals + Venue)</div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-5">
                    <button className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold flex-1">
                        Send Message
                    </button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex-1">
                        View Contact
                    </button>
                </div>

                {/* Enquiry Form */}
                <div className="bg-white shadow-md p-5 rounded mt-4">

                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Hi {venue.name},
                    </h3>

                    <form className="grid grid-cols-2 gap-4 text-sm">

                        <input type="text" placeholder="Name" className="border p-2 rounded" />
                        <input type="text" placeholder="Phone" className="border p-2 rounded" />

                        <input type="email" placeholder="Email" className="border p-2 rounded col-span-2" />
                        <input type="date" className="border p-2 rounded" />

                        <input type="number" placeholder="Guests Min" className="border p-2 rounded" />
                        <input type="number" placeholder="Guests Max" className="border p-2 rounded" />

                        {/* Function Type */}
                        <div className="col-span-2 mt-2">
                            <p className="font-semibold mb-2">Function Type</p>
                            <div className="flex gap-6">
                                <label><input type="radio" name="f1" /> Pre-Wedding</label>
                                <label><input type="radio" name="f1" /> Wedding</label>
                                <label><input type="radio" name="f1" /> Reception</label>
                            </div>
                        </div>

                        {/* Function Time */}
                        <div className="col-span-2 mt-2">
                            <p className="font-semibold mb-2">Function Time</p>
                            <div className="flex gap-6">
                                <label><input type="radio" name="time" /> Evening</label>
                                <label><input type="radio" name="time" /> Day</label>
                            </div>
                        </div>

                        <button className="bg-pink-600 text-white p-3 rounded mt-4 col-span-2">
                            Send Enquiry
                        </button>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default VenueDetails;
