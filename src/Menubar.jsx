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

function Menubar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All Cities");

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = () => setShowDropdown(false);
    if (showDropdown) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [showDropdown]);

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

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-lg-1 ms-xl-4">
              <Nav.Link href="#venues" className="ms-2">Venues</Nav.Link>
              <Nav.Link href="#vendors" className="ms-2 ms-xl-3">Vendors</Nav.Link>
              <Nav.Link href="#photos" className="ms-2 ms-xl-3">Photos</Nav.Link>
              <Nav.Link href="#real-weddings" className="ms-2 ms-xl-3">Real Weddings</Nav.Link>
              <Nav.Link href="#blog" className="ms-2 ms-xl-3">Blog</Nav.Link>
              <Nav.Link href="#e-invites" className="ms-2 ms-lg-3">E-Invites</Nav.Link>
              <Nav.Link href="#genie" className="ms-2 ms-lg-3">Genie</Nav.Link>
            </Nav>

            <div className="ms-auto d-none d-lg-flex align-items-center">
              <Button className="search-button" variant="link">
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
