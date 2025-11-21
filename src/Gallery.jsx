import React, { useRef, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./Gallery.css";
import img1 from "./assets/gallery/img1.avif";
import img2 from "./assets/gallery/img2.avif";
import img3 from "./assets/gallery/img3.avif";
import img4 from "./assets/gallery/img4.avif";
import img5 from "./assets/gallery/img5.avif";
import img6 from "./assets/gallery/img6.avif";
import img7 from "./assets/gallery/img7.avif";

function Gallery() {
  const baseSlides = [
    { img: img1, title: "Bridal Lahenga" },
    { img: img2, title: "Outfits" },
    { img: img3, title: "Blouse Designs" },
    { img: img4, title: "Wedding Sarees" },
    { img: img5, title: "Mehndi Designs" },
    { img: img6, title: "Wedding Jwellary" },
    { img: img7, title: "Wedding Makeup"}
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
    <Container className="gallery p-0 mt-5">
      <h5 className="gallery-heading">Gallery to Look for</h5>
      <div className="gallery-carousel-wrapper">
        {showLeft && (
          <button
            className="custom-arrow left"
            onClick={() => scroll("left")}
          >
            &#10094;
          </button>
        )}

        <div className="gallery-row" ref={carouselRef}>
          {slides.map((slide, index) => (
            <div key={index} className="gallery-card">
              <div className="gallery-image-wrapper">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="gallery-image"
                />
              </div>
              <p className="gallery-title">{slide.title}</p>
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

export default Gallery;
