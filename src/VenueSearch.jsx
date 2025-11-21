import React, { useRef, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./VenueSearch.css";

import Img1 from "./assets/venuesearch/img1.avif";
import Img2 from "./assets/venuesearch/img2.avif";
import Img3 from "./assets/venuesearch/img3.avif";
import Img4 from "./assets/venuesearch/img4.avif";
import Img5 from "./assets/venuesearch/img5.avif";
import Img6 from "./assets/venuesearch/img6.avif";

function VenueSearch() {
  const baseSlides = [
    { img: Img1, title: "4 Star & Above Wedding Hotel" },
    { img: Img2, title: "Banquet Halls" },
    { img: Img3, title: "Marriage Garden / Lawns" },
    { img: Img4, title: "3 Star Hotels with Banquets" },
    { img: Img5, title: "Country / Golf Club" },
    { img: Img6, title: "Wedding Resorts" },
  ];

  const slides = [...baseSlides, ...baseSlides, ...baseSlides];

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);

  // NEW STATE FOR ARROWS
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".venue-card");
    if (!firstCard) return;

    cardWidthRef.current = firstCard.offsetWidth;

    const middle = baseSlides.length * cardWidthRef.current;

    el.style.scrollBehavior = "auto";
    el.scrollLeft = middle;

    setTimeout(() => {
      el.style.scrollBehavior = "smooth";
    }, 50);
  }, []);

  const handleScroll = () => {
    const el = carouselRef.current;
    const cardWidth = cardWidthRef.current;
    if (!el || !cardWidth) return;

    const total = baseSlides.length * cardWidth;
    const middle = total;

    // SHOW LEFT ARROW ONLY AFTER MOVING FROM CENTER
    setShowLeft(el.scrollLeft > middle + 5);
    setShowRight(true);

    if (el.scrollLeft >= total * 2) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = total;
      el.style.scrollBehavior = "smooth";
    }

    if (el.scrollLeft <= 0) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = total;
      el.style.scrollBehavior = "smooth";
    }
  };

  const scroll = (dir) => {
    const el = carouselRef.current;
    const cardWidth = cardWidthRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <Container className="venue-search p-3 mt-4">
      <h5 className="venue-heading">Popular Venue Searches</h5>

      <div className="venue-carousel-wrapper">

        {/* LEFT ARROW - SHOW ONLY WHEN showLeft = true */}
        {showLeft && (
          <button
            className="venue-arrow venue-arrow-left"
            onClick={() => scroll("left")}
          >
            &#10094;
          </button>
        )}

        <div
          className="venue-carousel-row"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {slides.map((slide, index) => (
            <div key={index} className="venue-card">
              <img src={slide.img} alt={slide.title} className="venue-image" />
              <div className="venue-text">
                <p className="venue-title">{slide.title}</p>
                <span className="venue-cities">
                  Mumbai | Bangalore | Pune |
                </span>
                <span className="venue-more">More</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW (ALWAYS SHOW) */}
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
