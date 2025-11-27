import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import './ContactPage.css'
import img1 from './assets/latestblogs/appstore.png';
import img2 from './assets/latestblogs/googleplay.png';


function ContactPage() {
    return (
        <div className="container py-5">

            {/* TITLE SECTION */}
            <span className="fw-semibold">WedMeGood – Your Personal Wedding Planner</span>
            <p className="mt-2">Plan your wedding with Us</p>

            <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid iste eveniet dolorem totam consequatur quisquam expedita iure illo veritatis. Esse, perferendis ullam? Minus, aliquam. Quo accusantium incidunt corporis nam vero, vitae error, eveniet illo dolore vel tempora ab? Aperiam ducimus voluptas maxime numquam animi nemo hic veritatis, accusamus sit possimus. Aspernatur alias nobis, porro mollitia temporibus ea quisquam, natus sed odio voluptates nemo sunt!
            </p>

            <div className="row pt-4 text-sm">

                <div className="col-12 col-md-6 col-lg-5">
                    <div className="fw-semibold mb-2 text-lg">Contact us to get best deals</div>
                    <div className="d-flex align-items-start mt-3">
                        <div className="me-4">
                            <div className="fw-semibold">For Vendors</div>
                            <p className="pt-1 fw-normal mb-0">vendors@wedmegood.com</p>
                            <p className="fw-normal">0124-6812346</p>
                        </div>

                        <div className="d-none d-md-block" style={{ width: "1px", height: "60px", background: "#a8a7a7ff", marginRight: '1rem' }}></div>

                        <div>
                            <div className="fw-semibold">For Users</div>
                            <p className="pt-1 fw-normal mb-0">info@wedmegood.com</p>
                            <p className="fw-normal">0124-6812345</p>
                        </div>
                    </div>
                    <div className="fw-semibold text-lg mt-3">
                        Registered Address
                        <p className="text-sm fw-normal pt-3">
                            Second Floor, Ocus Technopolis, Sector 54 Golf <br />
                            Course Road, Gurgaon, Haryana, India, 122002
                        </p>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3 mt-4 mt-md-0 ">
                    <div className="fw-semibold mb-2 text-lg ms-md-3">Follow us on:</div>
                    <ul className="list-unstyled mt-3 ms-md-3">
                        <li className="d-flex align-items-center mb-2">
                            <FaFacebookF className="me-2 text-blue-900" /> Facebook
                        </li>
                        <li className="d-flex align-items-center mb-2">
                            <FaTwitter className="me-2 text-blue-500" /> Twitter
                        </li>
                        <li className="d-flex align-items-center mb-2">
                            <FaPinterest className="me-2 text-danger" /> Pinterest
                        </li>
                        <li className="d-flex align-items-center mb-2">
                            <FaInstagram className="me-2 text-danger" /> Instagram
                        </li>
                        <li className="d-flex align-items-center">
                            <TfiYoutube className="me-2 text-danger" /> Youtube
                        </li>
                    </ul>
                </div>

                <div className="col-md-12 col-lg-3 mt-4 mt-md-0">
                    <div className="fw-semibold mb-2 text-lg">Get The WedMeGood App</div>
                    <div className="d-flex flex-column mt-3">
                        <img src={img1} alt="App Store" className="img-fluid mb-3" style={{ maxWidth: 160 }} />
                        <img src={img2} alt="Google Play" className="img-fluid" style={{ maxWidth: 160 }} />
                    </div>
                </div>

            </div>


            <div className="fw-semibold text-lg pt-4">
                Get Latest Blog Alerts

                <div className="pt-3 text-sm">
                    <input
                        type="email"
                        placeholder="Email*"
                        className="border border-gray-500 px-2 py-2 w-40 !md:w-72 !md:px-4 sm:w-70 sm:px-3 border-end-0 focus:outline-none"
                    />
                    <button className="bg-pink-600 text-white p-2 border border-gray-300 border-start-0">
                        Submit
                    </button>
                </div>

                <button className="register-btn mt-3 px-3 py-2 !text-base rounded">
                    Register as a Vendor
                </button>
            </div>

            <hr className="mt-5" />

            <div className="row text-left justify-content-lg-between text-md-start">

                <div className="col-lg-2 col-md-4 col-6 p-2">
                    <h6>Start Planning</h6>
                    <ul className="list-unstyled pt-2 leading-loose">
                        <li>Search By Vendor</li>
                        <li>Search By City</li>
                        <li>Download Our App</li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-4 col-6 p-2">
                    <h6>Wedding Ideas</h6>
                    <ul className="list-unstyled pt-2 leading-loose">
                        <li>Wedding Blog</li>
                        <li>Real Wedding</li>
                        <li>Submit Wedding</li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-4 col-6 p-2">
                    <h6>Photo Gallery</h6>
                    <ul className="list-unstyled pt-2 leading-loose">
                        <li>Bridal Wear</li>
                        <li>Wedding Jewellery</li>
                        <li>Wedding Decor</li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-4 col-6 p-2">
                    <h6>Home</h6>
                    <ul className="list-unstyled pt-2 leading-loose">
                        <li>About WedMeGood</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-4 col-6 p-2">
                    <h6>Wedding Invitation Maker</h6>
                    <ul className="list-unstyled pt-2 leading-loose">
                        <li>Wedding Card Designs</li>
                        <li>Save the Date Templates</li>
                        <li>Invitation Video Templates</li>
                    </ul>
                </div>

            </div>

        </div >

    )
}; export default ContactPage;