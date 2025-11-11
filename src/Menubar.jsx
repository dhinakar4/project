// src/Menubar.js
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Menubar.css";
import { useState, useEffect } from 'react';
import CityDropdown from './CityDropDown';
import goaImage from './assets/goa.webp';
import jaipurImage from './assets/jaipur.webp';
import udaipurImage from './assets/udaipur.webp';
import { MdOutlineInstallMobile } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import latestwedding1 from './assets/latestwedding1.avif'
import latestwedding2 from './assets/latestwedding2.avif'
import blogimg1 from './assets/blogimg1.webp'
import blogimg2 from './assets/blogimg2.webp'



function Menubar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

const handleDropdownClick = (menu) => {
  // Toggle dropdown when same item clicked again
  setActiveDropdown(activeDropdown === menu ? null : menu);
};


  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = () => setShowDropdown(false);
    if (showDropdown) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [showDropdown]);

  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}, [menuOpen]);


  return (
    <div>
      {/* Top bar */}
     <div className="topbar ">
  <span className="topbar-text ms-4 text-white">
    India’s Favourite Wedding Planning Platform
  </span>

 <Button
  className={`city-toggle-btn me-auto ms-4 ${showDropdown ? "open" : ""}`}
  variant="light"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    setShowDropdown((s) => !s);
  }}
>
  {selectedCity}
</Button>

 {/* Right side icons */}
  <div className="topbar-links ms-auto d-flex align-items-center gap-4 me-4">
    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
      <span className='right-icon'><GrNotes size={18} className='me-1 mb-1'/> Write A Review</span>
    </a>
    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2 ">
      <span className='right-icon' >< MdOutlineInstallMobile size={19} className='me-1 mb-1' />Download App</span>
    </a>
  </div>

</div>
      {/* Dropdown below topbar */}
      <CityDropdown
        show={showDropdown}
        close={() => setShowDropdown(false)}
       onCitySelect={(cityName) => {
  setSelectedCity(cityName);
  setShowDropdown(false);
  if (cityName !== "All Cities") {
    window.history.pushState({}, "", `?city=${cityName.toLowerCase().replace(/\s+/g, '-')}`);
  } else {
    window.history.pushState({}, "", window.location.pathname);
  }
}}
      />

      {/* Main Navbar */}
      <Navbar expand="lg" className="wedding-navbar">
        <Container fluid className="px-3 px-lg-4">
          {/* Brand logo navigates home */}
          <Navbar.Brand
            onClick={() => navigate('/')}
            className="d-flex align-items-center brand-logo ms-3"
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://images.wedmegood.com/images/WMG-logo.svg"
              alt="WedMeGood Logo"
              height="30"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setMenuOpen((prev) => !prev)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-lg-1 ms-xl-4">
          <li className={`nav-item dropdown mega-dropdown ${ activeDropdown === "venues" ? "active" : "" }`}> 
            <a className="nav-link venues-link ms-xl-3 ms-2" href="#venues"
             onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("venues");
      }}} >Venues </a>

  <div className="mega-menu ">
    <div className="dropdown-columns">

      {/* === By Type === */}
      <div className="column by-type ">
        <h6 style={{fontWeight:'500'}}>By Type</h6>
        <ul>
          <li><a href="banquethalls">Banquet Halls</a></li>
          <li><a href="weddingresorts">Wedding Resorts</a></li>
        </ul>
      </div>

      {/* === By City (Gray Background) === */}
      <div className="column by-city">
        <div className="inner">
          <h6 style={{fontWeight:'500'}}>By City</h6>
          <ul>
            <li><a href="mumbai">Mumbai</a></li>
            <li><a href="bangalore">Bangalore</a></li>
          </ul>
        </div>
      </div>

      {/* === Destination Wedding Venues === */}
      <div className="column destination-column">
        <h6 className='text-dark' style={{fontWeight:'500', fontSize:'14px'}}>Destination Wedding Venues</h6>
        <div className="row g-3 mt-1 city-img">
          {[
            { name: "Goa", img: goaImage},
            { name: "Udaipur", img: udaipurImage },
            { name: "Jaipur", img: jaipurImage },
          ].map((city, i) => (
            <div key={i} className="col-4 text-center">
              <img src={city.img} alt={city.name} className="img-fluid rounded mb-1" />
              <p className="city-name">{city.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</li>


<li className={`nav-item dropdown mega-dropdown ${ activeDropdown === "vendors" ? "active" : "" }`}>
  <a className="nav-link vendors-link ms-xl-3 ms-2" href="#vendors"   onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("vendors");
      }}}>Vendors</a>
  <div className="mega-menu vendors-menu">
    <div className="dropdown-columns">

      {/* === Column 1 === */}
      <div className="column1">
        <h6>Photographers</h6>
        <ul>
          <li><a href="#">Photographers</a></li>
        </ul>

        <h6>Makeup</h6>
        <ul>
          <li><a href="#">Bridal Makeup Artists</a></li>
          <li><a href="#">Family Makeup</a>
            <span className="wmg-service"><span>WMG SERVICE</span></span>
          </li>
        </ul>

        <h6>Planning & Decor</h6>
        <ul>
          <li><a href="#">Wedding Planners</a></li>
          <li><a href="#">Decorators</a></li>
        </ul>

        <h6>Virtual Planning</h6>
        <ul>
          <li><a href="#">Virtual Planning</a>
           <span className="wmg-service"><span>WMG SERVICE</span></span>
          </li>
        </ul>

        <h6>Mehndi</h6>
        <ul>
          <li><a href="#">Mehndi Artists</a></li>
        </ul>
      </div>

      {/* === Column 2 === */}
      <div className="column1 "  style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6>Music & Dance</h6>
        <ul>
          <li><a href="#">DJs</a></li>
        </ul>

        <h6>Invites & Gifts</h6>
        <ul>
          <li><a href="#">Invitations</a></li>
        </ul>

        <h6>Food</h6>
        <ul>
          <li><a href="#">Catering Services</a></li>
        </ul>
      </div>

      {/* === Column 3 === */}
      <div className="column1">
        <h6>Pre Wedding Shoot</h6>
        <ul>
          <li><a href="#">Locations</a></li>
          <li><a href="#">Photographers</a></li>
        </ul>

        <h6>Bridal Wear</h6>
        <ul>
          <li><a href="#">Lehengas</a></li>
          <li><a href="#">Sarees</a></li>
        </ul>

        <h6>Groom Wear</h6>
        <ul>
          <li><a href="#">Sherwani</a></li>
          <li><a href="#">Suits / Tuxes</a></li>
        </ul>
      </div>

      {/* === Column 4 === */}
      <div className="column1"   style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6>Jewellery & Accessories</h6>
        <ul>
          <li><a href="#">Jewellery</a></li>
          <li><a href="#">Flower Jewellery</a></li>
        </ul>

        <h6>Pandits</h6>
        <ul>
          <li><a href="#">Wedding Pandits</a></li>
        </ul>

        <h6>Bridal Grooming</h6>
        <ul>
          <li><a href="#">Beauty and Wellness</a></li>
        </ul>
      </div>

    </div>
  </div>
</li>

<li className={`nav-item dropdown mega-dropdown ${ activeDropdown === "photos" ? "active" : "" }`}>
  <a className="nav-link vendors-link ms-xl-3 ms-2" href="#photos"   onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("photos");
      } }}>Photos</a>
  <div className="mega-menu vendors-3col">
    <div className="dropdown-columns">

      {/* Column 1 */}
      <div className="column" style={{background:'none'}}>
        <h6>Outfit</h6>
        <ul>
          <li><a href="#">Wedding Sarees</a></li>
        </ul>
          <h6>Jwellary & Accessories</h6>
        <ul>
          <li><a href="#">Bridal Jwellary</a></li>
        </ul>
          <h6>Mehndi</h6>
        <ul>
          <li><a href="#">Mehndi Designs</a></li>
        </ul>
      </div>

      {/* Column 2 */}
      <div className="column" style={{background:'none'}}>
        <h6>Decor & Ideas</h6>
        <ul>
          <li><a href="#">Wedding Decor</a></li>
        </ul>
        <h6>Wedding Card Designs</h6>
        <ul>
          <li><a href="#">Designs</a></li>
        </ul>
        <h6>Wedding Photography</h6>
        <ul>
          <li><a href="#">Pre Wedding Shoot</a></li>
        </ul>
      </div>

      {/* Column 3 */}
      <div className="column " style={{background:'none'}}>
        <h6>Groom Wear</h6>
        <ul>
          <li><a href="#">Sherwani for Groom</a></li>
        </ul>
        <h6>Bridal Makeup & Hair</h6>
        <ul>
          <li><a href="#">Bridal Makeup</a></li>
        </ul>
      </div>

    </div>
  </div>
</li>


<li className={`nav-item dropdown mega-dropdown ${ activeDropdown === "realweddings" ? "active" : "" }`}>
  <a className="nav-link vendors-link ms-xl-3 ms-2" href="#realweddings"   onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("realweddings");
      }}}>Real Weddings</a>

  <div className="mega-menu vendors-menu realwedding-menu">
    <div className="dropdown-columns">

      {/* === Column 1 === */}
      <div className="column1">
        <h6>By City</h6>
        <ul>
          <li><a href="#">Coimbatore</a></li>
          <li><a href="#">Chennai</a></li>
        </ul>

      </div>

      {/* === Column 2 === */}
      <div className="column1 "  style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6>By Culture</h6>
        <ul>
          <li><a href="#">Bengali</a></li>
          <li><a href="#">Gujarati</a></li>
        </ul>
      </div>

      {/* === Column 3 === */}
      <div className="column1">
        <h6>By Theme</h6>
        <ul>
          <li><a href="#">Destination</a></li>
          <li><a href="#">Grand & Luxurious</a></li>
        </ul>
      </div>

      {/* === Column 4 === */}
      <div className="column1"   style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6 style={{color:'black'}} className='real-wedding'>Latest Real Weddings</h6>
         <div className="latest-wedding-list mt-3" style={{fontWeight:'400',fontSize:'14px'}}>
          {[
            { name: "Supriya & Abhinay", img: latestwedding1},
            { name: "Reet & Prateek", img: latestwedding2},
          ].map((item, i) => (
            <div key={i} className="latest-wedding-item ">
              <div className="image-container me-3">
              <img src={item.img} alt={item.name} className="latest-wedding-img" />
              <p className="item-name mt-2 ms-5">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</li>


<li className={`nav-item dropdown mega-dropdown ${ activeDropdown === "blog" ? "active" : "" }`}>
  <a className="nav-link vendors-link ms-xl-3 ms-2" href="#blog"   onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("blog");
      }}}>Blog</a>

  <div className="mega-menu vendors-menu blog-menu">
    <div className="dropdown-columns">

      {/* === Column 1 === */}
      <div className="column1">
        <h6>Browse by Category</h6>
        <ul>
          <li><a href="#">Bridal Makeup</a></li>
          <li><a href="#">Honeymoon Travel</a></li>
        </ul>
      </div>

      {/* === Column 2 === */}
      <div className="column1" style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6>Popular Sections</h6>
        <ul>
          <li><a href="#">South Indian Wedding</a></li>
          <li><a href="#">Real Brides Reveal</a></li>
        </ul>
      </div>

      {/* === Column 3 === */}
      <div className="column1">
        <h6>Most Searched Blogs</h6>
        <ul>
          <li><a href="#">Wedding Songs</a></li>
          <li><a href="#">Best Bridal Entry Songs</a></li>
        </ul>
      </div>

      {/* === Column 4 === */}
      <div className="column1" style={{ backgroundColor: "rgb(249, 248, 248)" }}>
        <h6 style={{ color: "black" }}>Top Blogs</h6>
        <div className="latest-wedding-list me-3 mt-2">
          {[
            { name: "Mehendi Designs", img: blogimg1 },
            { name: "Honeymoon Hotels", img: blogimg2 },
          ].map((item, i) => (
            <div key={i} className="latest-wedding-item" style={{fontWeight:'400',fontSize:'14px'}}>
              <div className="image-container">
                <img src={item.img}  alt={item.name} className="latest-wedding-img"  />
                <p className="item-name ms-5 mt-3">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</li>


<li className={`nav-item dropdown mega-dropdown ${activeDropdown === "einvites" ? "active" : "" }`}>
  <a className="nav-link vendors-link ms-xl-3 ms-2" href="#einvites"   onClick={(e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        handleDropdownClick("einvites");
      } }}>
    E-Invites
  </a>

  <div className="mega-menu vendors-menu einvite-menu">
    <div className="dropdown-columns">
      <div className="column1">
        <h6>Wedding Invitation Maker</h6>
        <ul>
          <li><a href="#">Wedding Card Designs</a></li>
          <li><a href="#">Invitation Video Templates</a></li>
        </ul>
      </div>
    </div>
  </div>
</li>
 
  <a className="nav-link ms-xl-3 ms-2 genie" href="#genie">Genie</a>
            </Nav>

            <div className="ms-auto d-none d-lg-flex align-items-center">
              <Button className="search-button" variant="link" onClick={() => navigate('/search')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="lightgray" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="10" cy="10" r="8" />
                  <path d="m21 22-4.35-4.35" />
                </svg>
              </Button>

              <Button
                className="login-button me-3"
                variant="link"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menubar;
