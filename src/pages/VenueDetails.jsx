import { useParams } from "react-router-dom";
import venuesData from "../data/venues.json";
import { TiStarFullOutline } from "react-icons/ti";
import { PiBankFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { ImPencil } from "react-icons/im";
import { GoShareAndroid } from "react-icons/go";
import './VenueDetails.css';
import img from '../assets/handpicked.avif';
import { TbMathGreater } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";



const allVenues = Object.values(venuesData).flat();

function VenueDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const venue = allVenues.find(v => String(v.id) === String(id));
    if (!venue) return <h4>Venue Not Found!</h4>

    return (
        <div className="container">
            <div className="text-gray-400 text-sm flex gap-2 mt-3 px-5">
                <span className="cursor-pointer  flex">
                    <p className="hover:text-pink-600" onClick={() => navigate("/")}>Home</p>
                    <TbMathGreater className="mt-1 ml-[1px] mr-[1px]" size={14} />
                    <span className="cursor-pointer flex">
                        <p className="hover:text-pink-600" onClick={() => {
                            navigate("/venues?type=all", { state: { title: "Wedding Venues" } });
                            setFilteredData(allVenues);
                        }}>Wedding Venues</p>
                    </span>
                    <TbMathGreater className="mt-1 ml-[1px] mr-[1px]" size={14} />
                    <span className="flex">
                        <p className="hover:text-pink-600" onClick={() => {
                            navigate(`/venue?city=${venue.city}`, { state: { title: venue.city } })
                        }}>
                            Wedding Venues {venue.city} 
                        </p>
                    </span>
                </span>
            </div>
            <div className="relative px-5 mt-1">
                <div className="absolute left-[48px] flex items-center text-white font-semibold text-sm rounded-sm shadow-md group cursor-pointer">
                    <img src={img} alt="" />
                    <div className="tooltip-boxes hidden group-hover:flex absolute left-10 bg-orange-400 text-white text-xs px-2 py-2 rounded-sm shadow-xl w-[235px] z-50">
                        Showcases sponsored,top rated vendors across budgets
                    </div>
                </div>
                <img src={venue?.image} alt={venue.name} className=" rounded-sm detail-image" />
                <div className="absolute bg-white shadow-sm top-85 rounded-sm w-[620px] py-4 ms-[20px] h-58">
                    <div className="flex text-2xl font-semibold px-4">
                        {venue.name}
                        <span className="detail-page-rating ms-auto d-flex text-white bg-green-600 py-2 px-3 rounded-xs ">
                            <TiStarFullOutline className="mt-[2px] text-white me-1 " size={20} />
                            {venue.rating || 0} </span>
                    </div>
                    <div>
                        <span className="d-flex text-gray-500 px-4">
                            <FaLocationDot className="mt-[4px] me-1 text-gray-600" size={14} />
                            <strong className="me-1 text-gray-600">{venue.city}</strong> (View on Map)
                            <span className="ms-auto font-normal text-md mt-[1px] me-1">{venue.review}</span>
                        </span>
                        <span className="px-[40px] text-gray-500 text-sm">{venue.area},India</span>
                    </div>
                    <div className="flex text-green-600 mt-3 font-medium px-4" >
                        <MdCall className="mt-[5px] me-2" />
                        Contact
                    </div>

                    <div className="flex bg-light mt-[30px] p-[8px] items-center justify-center ">
                        <div className="flex col-3 justify-content-center text-sm pl-4">
                            <HiPhoto className=" me-1" size={20} />
                            21 Photos
                        </div>
                        <span className="border-l text-gray-300 h-8 mx-2"></span>
                        <div className="flex col-3 justify-content-center text-sm">
                            <IoIosHeartEmpty className=" me-1" size={20} />
                            Shortlist
                        </div>
                        <span className="border-l text-gray-300 h-8 mx-2"></span>
                        <div className="flex col-3 justify-content-center text-sm">
                            <ImPencil className=" me-1 " size={18} />
                            Write a Review
                        </div>
                        <span className="border-l text-gray-300 h-8 mx-2"></span>
                        <div className="flex col-3 justify-content-center text-sm !pr-4">
                            <GoShareAndroid className=" me-1" size={20} />
                            Share
                        </div>
                    </div>

                </div>

                <div>

                </div>
                <div className="flex bg-white shadow-sm border-2 border-light mt-[220px] p-[15px] " style={{width:'660px'}}>
                    <div className="flex items-center gap-6 text-md ms-3">
                        <span>Banquets</span>
                        <span>Projects</span>
                        <span>About</span>
                        <span>Reviews</span>
                    </div>
                </div>
                <div className="flex bg-white shadow-sm border-bottom border-secondary mt-4 p-[15px]" style={{width:'660px'}}>
                    <span className="text-2xl ">Areas Available</span>
                </div>

            </div>

        </div>
    )
}; export default VenueDetails;