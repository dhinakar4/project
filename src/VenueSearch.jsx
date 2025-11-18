import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./VenueSearch.css";
import Img1 from "./assets/venuesearch/img1.avif";
import Img2 from "./assets/venuesearch/img2.avif";
import Img3 from "./assets/venuesearch/img3.avif";
import Img4 from "./assets/venuesearch/img4.avif";
import Img5 from "./assets/venuesearch/img5.avif";
import Img6 from "./assets/venuesearch/img6.avif";

function VenueSearch() {
  const slides = [
    { img: Img1, title: "4 Star & Above Wedding Hotel" },
    { img: Img2, title: "Banquet Halls" },
    { img: Img3, title: "Marriage Garden / Lawns" },
    { img: Img4, title: "3 Star Hotels with Banquets" },
    { img: Img5, title: "Country / Golf Club" },
    { img: Img6, title: "Wedding Resorts" },
  ];

  const carouselRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = 410;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <Container className="venue-search p-5">
      <h5 className="venue-heading">Popular Venue Searches</h5>

      <div className="venue-carousel-wrapper">
        {showLeft && (
          <button
            className="venue-arrow venue-arrow-left"
            onClick={() => scroll("left")}
          >
            &#10094;
          </button>
        )}

        <div className="venue-carousel-row" ref={carouselRef}>
          {slides.map((slide, index) => (
            <div key={index} className="venue-card">
              <img src={slide.img} alt={slide.title} className="venue-image" />
              <div className="venue-text">
                <p className="venue-title">{slide.title}</p>
                <span className="venue-cities">Mumbai | Bangalore | Pune |</span>
                 <span className="venue-more">More</span>
              </div>
            </div>
          ))}
        </div>

        {showRight && (
          <button
            className="venue-arrow venue-arrow-right"
            onClick={() => scroll("right")}
          >
            &#10095;
          </button>
        )}
      </div>
    </Container>
  );
}

export default VenueSearch;
