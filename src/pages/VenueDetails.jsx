import { useParams } from "react-router-dom";
import venuesData from "../data/venues.json";
import { TiStarFullOutline } from "react-icons/ti";
import { PiBankFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import './VenueDetails.css';

const allVenues = Object.values(venuesData).flat();

function VenueDetails() {

    const { id } = useParams();

    const venue = allVenues.find(v => String(v.id) === String(id));
    if (!venue) return <h4>Venue Not Found!</h4>

    return (
        <div className="container p-5 relative">
            <img src={venue?.image} alt={venue.name} className=" rounded-sm detail-image" />
            <div className="absolute bg-white shadow-sm top-95 w-[620px] py-4 ms-4">
                <div className="flex text-2xl font-semibold px-4">
                    {venue.name}
                    <span className="detail-page-rating ms-auto d-flex bg-green-500 py-2 px-4 rounded-sm ">
                        <TiStarFullOutline className="mt-[2px] text-white me-1 " size={20} />
                        {venue.rating || 0} </span>
                </div>
                <div>
                    <span className="d-flex text-gray-600 px-4">
                        <FaLocationDot className="mt-1 me-1" size={14} />
                        {venue.city}
                        <span className="ms-auto font-normal text-sm mt-[1px] me-3">{venue.review}</span>
                    </span>
                </div>
                <div className="flex text-green-600 mt-2 font-medium px-4" >
                    <MdCall className="mt-[5px] me-2" />
                    Contact
                </div>

                <div className="flex mt-4 bg-light">
                    <span className="flex">
                        <HiPhoto className="mt-2 me-2" size={18} />
                        21 Photos
                    </span>
                </div>

            </div>



            <div>

            </div>

        </div>
    )
}; export default VenueDetails;