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
    { img: img7, title: "Wedding Makeup" }
  ];

  const slides = [...baseSlides, ...baseSlides, ...baseSlides];

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);
  const hasScrolledRight = useRef(false);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".gallery-card");
    if (!firstCard) return;

    // compute width after layout (card width already set by CSS)
    cardWidthRef.current = firstCard.getBoundingClientRect().width;

    // center to middle copy (so infinite loop looks natural)
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

      // show left arrow only after user scrolled right manually
      if (hasScrolledRight.current) setShowLeft(true);
      setShowRight(true);
    };

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      // recompute card width on resize to keep infinite math accurate
      const updatedFirst = el.querySelector(".gallery-card");
      if (updatedFirst) {
        cardWidthRef.current = updatedFirst.getBoundingClientRect().width;
      }
      handleScroll();
    });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = carouselRef.current;
    const width = cardWidthRef.current;
    if (!el || !width) return;

    if (dir === "right") {
      hasScrolledRight.current = true;
      setShowLeft(true);
    }

    el.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth"
    });
  };


  return (
    <Container className="gallery mt-5">
      <h5 className="gallery-heading">Gallery to Look for</h5>
      <div className="gallery-carousel-wrapper">
        {showLeft && (
          <button
            className="custom-arrow leftside"
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
            className="custom-arrow rightside"
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
