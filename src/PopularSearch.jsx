import React, { useRef, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./PopularSearch.css";
import Img1 from "./assets/popularsearch/Img1.avif";
import Img2 from "./assets/popularsearch/Img2.avif";
import Img3 from "./assets/popularsearch/Img3.avif";
import Img4 from "./assets/popularsearch/Img4.avif";
import Img5 from "./assets/popularsearch/Img5.avif";
import Img6 from "./assets/popularsearch/Img6.avif";

function PopularSearch() {
  const baseSlides = [
    { img: Img1, title: "Bridal Wear in Mumbai" },
    { img: Img2, title: "Bridal Makeup Artists in Mumbai" },
    { img: Img3, title: "Photographers in Mumbai" },
    { img: Img4, title: "Invitations in Mumbai" },
    { img: Img5, title: "Catering Services in Mumbai" },
    { img: Img6, title: "Decorators in Mumbai" },
  ];

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);
  const hasScrolledRight = useRef(false);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const slides = [...baseSlides, ...baseSlides, ...baseSlides];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".carousel-card");
    if (!firstCard) return;

    cardWidthRef.current = firstCard.offsetWidth;

    // Start in the middle for seamless loop
    el.style.scrollBehavior = "auto";
    el.scrollLeft = baseSlides.length * cardWidthRef.current;
    el.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const total = baseSlides.length * cardWidthRef.current;

      // Infinite loop reset
      if (el.scrollLeft <= 0) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = total;
        el.style.scrollBehavior = "smooth";
      } else if (el.scrollLeft >= total * 2) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = total;
        el.style.scrollBehavior = "smooth";
      }

      // Show left arrow only if user clicked right
      if (hasScrolledRight.current) {
        setShowLeft(true);
      }
      setShowRight(true);
    };

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [baseSlides.length]);

  const scroll = (dir) => {
    const el = carouselRef.current;
    const cardWidth = cardWidthRef.current;
    if (!el || !cardWidth) return;

    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    if (dir === "right") hasScrolledRight.current = true;
  };

  return (
    <Container className="pv-search p-4">
      <h5 className="popular-heading">Popular Searches</h5>
      <div className="carousel-wrapper">
        {showLeft && (
          <button
            className="custom-arrow left"
            onClick={() => scroll("left")}
          >
            &#10094;
          </button>
        )}

        <div className="carousel-row" ref={carouselRef}>
          {slides.map((slide, index) => (
            <div key={index} className="carousel-card">
              <div className="carousel-image-wrapper">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="carousel-image"
                />
              </div>
              <p className="carousel-title">{slide.title}</p>
            </div>
          ))}
        </div>

        {showRight && (
          <button
            className="custom-arrow right"
            onClick={() => scroll("right")}
          >
            &#10095;
          </button>
        )}
      </div>
    </Container>
  );
}

export default PopularSearch;
