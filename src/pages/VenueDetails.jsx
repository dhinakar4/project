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
import { LuMail } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ContactPage from "../ContactPage";


const allVenues = Object.values(venuesData).flat();

function VenueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [showMessageForm, setShowMessageForm] = useState(true);
    const [showContactForm, setShowContactForm] = useState(false);


    const [form, setForm] = useState({
        name: "",
        phone: "+91",
        email: "",
        date: "",
        guests: "",
        rooms: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        switch (name) {
            case "name":
                if (!value.trim()) newErrors.name = "Required.";
                else if (!/^(?=[A-Z])(?=[A-Za-z]*[@#$%^&*][A-Za-z]*$)[A-Za-z@#$%^&*]{3,}$/.test(value))
                    newErrors.name = "Enter a valid name."
                else delete newErrors.name;
                break;

            case "phone":
                if (!value.trim()) newErrors.phone = "Required.";
                else if (!/^[0-9]{10}$/.test(value))
                    newErrors.phone = "Enter a valid 10-digit phone number.";
                else delete newErrors.phone;
                break;

            case "email":
                if (!value.trim()) newErrors.email = "Required.";
                else if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
                    newErrors.email = "Enter a valid email address.";
                else delete newErrors.email;
                break;

            case "date":
                if (!value.trim()) newErrors.date = "Required.";
                else delete newErrors.date;
                break;

            case "guests":
                if (!value || Number(value) < 50)
                    newErrors.guests = "Minimum 50 guests required.";
                else delete newErrors.guests;
                break;

            case "rooms":
                if (!value) newErrors.rooms = "Rooms count is required.";
                else delete newErrors.rooms;
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            alert("Form submitted!");
        }
    };


    const venue = allVenues.find((v) => String(v.id) === String(id));
    if (!venue) return <h1 className="text-center mt-10">Venue Not Found</h1>;

    return (
        <div>
            <div className="px-3 sm:px-5 mt-4 flex flex-col lg:flex-row gap-4 justify-center">
                <div className="w-full lg:w-[45%]">
                    {/* Breadcrumb */}
                    <div className="text-gray-500 text-sm flex gap-1 mb-3">
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

                        <div className="absolute z-10 group cursor-pointer">
                            <img src={img} alt="" className="" />
                            <div className="hidden group-hover:block absolute bg-orange-500 text-white text-xs p-2 rounded shadow-xl w-[180px] bottom-1 left-10">
                                Showcases sponsored, top rated vendors across budgets
                            </div>
                        </div>

                        <img src={venue.image} className="rounded-sm shadow-sm Venue-Detail-Img" />

                        <div className="absolute w-[100%] md:w-[93%] left-0 md:left-6 right-6 top-[200px] md:top-85 bg-white shadow-md rounded-sm">

                            <div className="flex items-center px-4 pt-3">
                                <h4 className="!text-gray-600 font-semibold">{venue.name}</h4>
                                <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-sm flex items-center gap-1">
                                    <TiStarFullOutline /> {venue.rating}
                                </span>
                            </div>

                            {/* Location */}
                            <div className="flex text-gray-600 mt-1 items-start px-4 md:px-4 ">
                                <FaLocationDot className="text-gray-600 mt-[3px]" />
                                <div className="ml-1">
                                    <strong className="!text-md !md:text-md !font-semibold">{venue.city}</strong> <span className="text-xs md:text-sm flex sm:inline-block">(View on Map)</span>
                                    <div className="text-gray-500 text-sm">{venue.area}, India</div>
                                </div>

                                <span className="ml-auto text-xs md:text-sm ">{venue.review}</span>
                            </div>

                            {/* Contact */}
                            <div className="flex text-green-600 mt-3 font-medium text-md px-4">
                                <MdCall size={18} className="mr-1 mt-1" />
                                Contact
                            </div>

                            <div className="flex flex-wrap items-center justify-between mt-6 bg-gray-50 border-gray-200 text-sm py-3 px-4">

                                {/* Photos */}
                                <div className="flex items-center gap-1 cursor-pointer text-gray-600 w-1/2 sm:w-auto mb-3 sm:mb-0 ml-0 sm:ml-5">
                                    <HiPhoto size={18} />
                                    <span>22 Photos</span>
                                </div>

                                {/* Divider */}
                                <div className="hidden sm:block h-6 w-[1px] bg-gray-300"></div>

                                {/* Shortlist */}
                                <div className="flex items-center gap-2 cursor-pointer text-gray-600 w-1/2 sm:w-auto mb-3 sm:mb-0 "
                                    onClick={() => navigate('/login')}>
                                    <IoIosHeartEmpty className="!ml-2 !md:ml-0" size={18} />
                                    <span>Shortlist</span>
                                </div>

                                <div className="hidden sm:block h-6 w-[1px] bg-gray-300"></div>

                                {/* Review */}
                                <div className="flex items-center gap-2 cursor-pointer text-gray-600 w-1/2 sm:w-auto sm:mb-0">
                                    <ImPencil size={16} />
                                    <span>Write a Review</span>
                                </div>

                                <div className="hidden sm:block h-6 w-[1px] bg-gray-300"></div>

                                {/* Share */}
                                <div className="flex items-center gap-2 cursor-pointer text-gray-600 w-1/2 sm:w-auto mr-0 sm:mr-5">
                                    <GoShareAndroid className="!ml-2 !md:ml-0" size={18} />
                                    <span>Share</span>
                                </div>

                            </div>


                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-80 sm:mt-55 bg-white shadow-sm border border-light p-[15px] 
                    flex gap-4 sm:gap-8 text-sm ">
                        <span className="cursor-pointer">Banquets</span>
                        <span className="cursor-pointer">Projects</span>
                        <span className="cursor-pointer">About</span>
                        <span className="cursor-pointer">Reviews</span>
                    </div>

                    {/* Areas Available */}
                    <div className="bg-white shadow-sm border mt-4 p-[13px] text-2xl">
                        Areas Available
                    </div>
                </div >

                <div className="w-full lg:w-[32%] mt-[0px] lg:mt-[32px]">

                    <div className="bg-white shadow-sm rounded-sm py-2 ">
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
                    <div className="bg-red-100 shadow-sm rounded-sm mt-4 py-3">
                        <span className="px-4 ">Destination Price</span> <hr />
                        <div className="text-3xl font-semibold text-gray-900 flex justify-content-between px-4">₹22.50 Lakhs
                            <div className="text-sm text-gray-500 ">/day for 73 rooms<br /> (Incl. Rooms + Meals + Venue)</div>
                        </div>
                    </div>


                    {/* Enquiry Form */}
                    <div className="bg-white shadow-sm border border-light rounded-sm mt-4">

                        {/* Top Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-2 sm:gap-2 px-3 py-3 border-b relative
                        ${showMessageForm ? "border-pink-500" : "border-green-500"} `}>

                            <button
                                onClick={() => {
                                    setShowMessageForm(true);
                                    setShowContactForm(false);
                                }}
                                className="venue-detail-message-button flex items-center justify-center gap-1 
                             text-white w-45 md:w-52 !py-2 md:!py-3 mx-auto !text-sm md:!text-base !rounded-full font-semibold"
                            >
                                <LuMail size={22} className="z-50" />
                                <span className="z-50 relative">Send Message</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowContactForm(true);
                                    setShowMessageForm(false);
                                }}
                                className="venue-detail-contact-button flex items-center justify-center gap-2
                            text-white w-45 md:w-52 !py-2 md:!py-3 mx-auto !text-sm md:!text-base !rounded-full font-semibold"
                            >
                                <FaPhone size={22} className="z-50" />
                                <span className="z-50 relative">View Contact</span>
                            </button>

                            <div
                                className={`absolute -bottom-[6px] bg-white px-[2px] transition-all duration-300
                            ${showMessageForm ? "left-[50px] sm:left-[105px]" : "left-[200px] sm:left-[330px]"}`}
                            >

                                <div className={`w-3 h-3 border-b border-r rotate-45 
                            ${showMessageForm ? "border-pink-500" : "border-green-500"}`}></div>
                            </div>

                        </div>

                        {showContactForm && (
                            <div className="px-4 pb-6 pt-3">

                                <p className="font-semibold text-gray-700 mb-4">
                                    Verify your mobile to contact the vendor
                                </p>

                                {/* Full Name Input */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm relative" onSubmit={handleSubmit}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name*"
                                            value={form.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`border-b border-gray-400 hover:border-b-gray-900 transition-colors duration-300 p-2 outline-none w-full ${errors.name ? "border-red-500" : ""}`}
                                        />
                                        {errors.name && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.name}</p>}
                                    </div>
                                    <div className="flex w-full relative">
                                        <img
                                            src="https://flagcdn.com/w20/in.png"
                                            alt="India"
                                            className="me-2 border-b border-gray-400 pb-1 pt-[20px]"
                                        />
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone*"
                                            value={form.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`border-b border-gray-400 pt-2 outline-none w-full ${errors.phone ? "border-red-500" : ""}`}
                                        />
                                        {errors.phone && <p className="absolute top-10 text-red-500 text-xs">{errors.phone}</p>}
                                    </div>

                                </div>


                                {/* WhatsApp Toggle */}
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-semibold">Notify me on Whatsapp</p>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-[46px] h-[26px] bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:absolute after:top-[3px] after:left-[4px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>

                                {/* Final Submit Button */}
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-[8px] md:py-[10px] !text-md md:!text-lg font-semibold">
                                    View Contact
                                </button>

                            </div>
                        )}


                        {showMessageForm && (
                            <div className="py-2">
                                <span className="!text-lg font-semibold text-gray-700 mb-5 px-4">
                                    Hi {venue.name},
                                </span>
                                <div className="mt-3">
                                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm px-4 pb-6" onSubmit={handleSubmit}>

                                        {/* Name */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name*"
                                                value={form.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border-b border-gray-400 hover:border-b-gray-900 transition-colors duration-300
                                            p-2 outline-none w-full ${errors.name ? "border-red-500" : ""}`}
                                            />
                                            {errors.name && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.name}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="flex relative">
                                            <img
                                                src="https://flagcdn.com/w20/in.png"
                                                alt="India"
                                                className="me-2 border-b border-gray-400 pb-2 pt-[15px]"
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="Phone*"
                                                value={form.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border-b border-gray-400 outline-none w-full ${errors.phone ? "border-red-500" : ""}`}
                                            />
                                            {errors.phone && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.phone}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={form.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border-b border-gray-400 hover:border-b-gray-900 transition-colors duration-300 p-2 outline-none w-full ${errors.email ? "border-red-500" : ""}`}
                                            />
                                            {errors.email && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.email}</p>}
                                        </div>

                                        {/* Date */}
                                        <div className="relative">
                                            <DatePicker
                                                selected={form.date}
                                                onChange={(date) => setForm({ ...form, date })}
                                                placeholderText="Function Date*"
                                                minDate={new Date()}
                                                wrapperClassName="w-full"
                                                dateFormat="dd/MM/yyyy"
                                                className={`border-b border-gray-400 p-2 outline-none w-full ${errors.date ? "border-red-500" : ""}`}
                                            />

                                            {errors.date && (
                                                <p className="absolute left-0 top-10 text-red-500 text-xs min-h-[15px]">{errors.date}</p>
                                            )}
                                        </div>

                                        {/* Guests */}
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="guests"
                                                placeholder="No. of Guests (min 50)"
                                                value={form.guests}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border-b border-gray-400 hover:border-b-gray-900 transition-colors duration-300 p-2 outline-none w-full ${errors.guests ? "border-red-500" : ""}`}
                                            />
                                            {errors.guests && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.guests}</p>}
                                        </div>

                                        {/* Rooms */}
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="rooms"
                                                placeholder="No. of Rooms"
                                                value={form.rooms}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border-b border-gray-400 hover:border-b-gray-900 transition-colors duration-300 p-2 outline-none w-full ${errors.rooms ? "border-red-500" : ""}`}
                                            />
                                            {errors.rooms && <p className="absolute left-0 top-10 text-red-500 text-xs">{errors.rooms}</p>}
                                        </div>


                                    </form>

                                </div>

                                {/* Function Type */}
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-[50px] px-4 text-sm ">

                                    <div className="mt-0 md:mt-2">
                                        <p className="font-semibold mb-3">Function Type</p>
                                        <div className="flex gap-6 !text-xs">
                                            <label><input type="radio" name="ft" /> Pre-Wedding</label>
                                            <label><input type="radio" name="ft" /> Wedding</label>
                                        </div>
                                    </div>

                                    <div className="mt-0 md:mt-2">
                                        <p className="font-semibold mb-3">Function Time</p>
                                        <div className="flex gap-8 !text-xs">
                                            <label><input type="radio" name="time" /> Evening</label>
                                            <label><input type="radio" name="time" /> Day</label>
                                        </div>
                                    </div>

                                </div>

                                {/* WhatsApp Toggle */}
                                <div className="flex items-center justify-between mt-2 md:mt-4 px-4">
                                    <p className="font-semibold text-sm mt-2">Notify me on Whatsapp</p>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-[46px] h-[26px] bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:absolute after:top-[3px] after:left-[4px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>

                                <button className="!ml-6 !text-md md:!text-lg bg-pink-600 text-white p-3 w-[85%] md:w-[90%] mt-2 md:mt-4 font-semibold ">
                                    Check Availability & Prices
                                </button>
                            </div>
                        )}
                        <span className="text-xs px-[37px] md:px-[30px] text-gray-400 !pt-0 md:!pt-2 flex ">Complete Information ensures you got accurate and timely vendor responses</span>

                        <div className="flex gap-2 items-center justify-center p-3">
                            <span className="bg-red-100 px-2 py-[2px] text-xs">In High Demand</span>
                            <span className="text-sm">13 enquires last week</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 text-red-600 p-3 ">
                        <FaFlag className="mt-[5px]" />
                        <span onClick={() => navigate('/login')}>Report Inaccurate Info</span>
                    </div>

                </div>

            </div >
            <ContactPage />
        </div>
    );
}

export default VenueDetails;
