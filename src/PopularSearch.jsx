import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./PopularSearch.css";
import Img1 from "./assets/popularsearch/Img1.avif";
import Img2 from "./assets/popularsearch/Img2.avif";
import Img3 from "./assets/popularsearch/Img3.avif";
import Img4 from "./assets/popularsearch/Img4.avif";
import Img5 from "./assets/popularsearch/Img5.avif";
import Img6 from "./assets/popularsearch/Img6.avif";

function PopularSearch() {
  // 👇 now each slide has an image and a name
  const slides = [
    { img: Img1, title: "Bridal Wear" },
    { img: Img2, title: "Bridal Makeup Artists" },
    { img: Img3, title: "Photographers" },
    { img: Img4, title: "Invitations" },
    { img: Img5, title: "Catering Services" },
    { img: Img6, title: "Decorators" },
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
    const scrollAmount = 320;
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
    <Container className="pv-search p-5">
      <h5 className="popular-heading">Popular Searches</h5>

      <div className="carousel-wrapper">
        {showLeft && (
          <button className="custom-arrow left" onClick={() => scroll("left")}>
            &#10094;
          </button>
        )}

        <div className="carousel-row" ref={carouselRef}>
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide ">
              <img
                src={slide.img}
                alt={slide.title}
                className="carousel-image"
              />
              <p className="carousel-title ">{slide.title}</p>
            </div>
          ))}
        </div>

        {showRight && (
          <button className="custom-arrow right" onClick={() => scroll("right")}>
            &#10095;
          </button>
        )}
      </div>
    </Container>
  );
}

export default PopularSearch;
