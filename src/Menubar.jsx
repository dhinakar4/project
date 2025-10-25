import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Menubar.css";
import heroImage from './assets/homeimg.webp';

function Menubar() {
  const navigate = useNavigate(); //  Hook to navigate between pages

  return (
    <div>
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

          {/* Search & Login (Mobile View) */}
          <div className="d-flex d-lg-none align-items-center order-lg-3">
            <Button className="search-button-mobile " variant="link">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </Button>
            <Button 
              className="login-button-mobile" 
              variant='link' 
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-lg-1 ms-xl-4">
              <Nav.Link href="#venues" className='ms-2'>Venues</Nav.Link>
              <Nav.Link href="#vendors" className='ms-2'>Vendors</Nav.Link>
              <Nav.Link href="#photos" className='ms-2'>Photos</Nav.Link>
              <Nav.Link href="#real-weddings" className='ms-2'>Real Weddings</Nav.Link>
              <Nav.Link href="#blog" className='ms-2'>Blog</Nav.Link>
              <Nav.Link href="#e-invites" className='ms-2'>E-Invites</Nav.Link>
              <Nav.Link href="#genie" className='ms-2'>Genie</Nav.Link>
            </Nav>

            {/*  Search & Login (Desktop View) */}
            <Nav className="ms-auto d-none d-lg-flex align-items-center">
              <Button className="search-button" variant="link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="lightgray" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="10" cy="10" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Button>

              {/*  Added navigate on click */}
              <Button 
                className="login-button" 
                variant="link" 
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*  Hero Section */}
      <div className="hero-section">
        <img 
          src={heroImage} 
          alt="Wedding Couple" 
          className="hero-image"
        />
      </div>
    </div>
  );
}

export default Menubar;
