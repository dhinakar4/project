import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import "./FeatureVendor.css";

import img1 from "./assets/featurevendor/img1.avif";
import img2 from "./assets/featurevendor/img2.avif";
import img3 from "./assets/featurevendor/img3.avif";
import img4 from "./assets/featurevendor/img4.avif";
import img5 from "./assets/featurevendor/img5.avif";
import img6 from "./assets/featurevendor/img6.avif";

function FeatureVendor() {
  const baseSlides = [
    { img: img1, title: "Novotel Mumbai International Airport", desc: 'Wedding Venues, Marol', price: '₹ 1,00,000', quantity: 'per function', rating: '4.9' },
    { img: img2, title: "Makeup Artistry By Drishti", desc: 'Bridal Makeup Artists', price: '₹ 16,500', rating: '5.0' },
    { img: img3, title: "Whistling Woodzs Jungle Resort", desc: 'Wedding Venues', price: 'Rental Only', rating: '4.8' },
    { img: img4, title: "The Royal Ark", desc: 'Wedding Venues', price: '₹ 1,500', quantity: 'per plate', rating: '4.6' },
    { img: img5, title: "Velvet Veil Beautys", desc: 'Bridal Makeup Artists', price: '₹ 2,00,000', rating: '4.9' },
    { img: img6, title: "Tarangi Hotels & Resorts", desc: 'Wedding Venues', price: '₹ 4,500 onwards', rating: '4.7' },
  ];

  // Duplicate for infinite effect
  const slides = [...baseSlides, ...baseSlides, ...baseSlides];

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);
  const hasScrolledRight = useRef(false);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".feature-vendor-card");
    if (!firstCard) return;

    cardWidthRef.current = firstCard.getBoundingClientRect().width;

    el.style.scrollBehavior = "auto";
    el.scrollLeft = baseSlides.length * cardWidthRef.current;
    el.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const total = baseSlides.length * cardWidthRef.current;
      if (el.scrollLeft <= 0) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = total;
        el.style.scrollBehavior = "smooth";
      } else if (el.scrollLeft >= total * 2) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = total;
        el.style.scrollBehavior = "smooth";
      }

      if (hasScrolledRight.current) setShowLeft(true);
      setShowRight(true);
    };

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      const updatedFirst = el.querySelector(".feature-vendor-card");
      if (updatedFirst) cardWidthRef.current = updatedFirst.getBoundingClientRect().width;
      handleScroll();
    });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const width = cardWidthRef.current;

    if (dir === "right") hasScrolledRight.current = true;

    el.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
  };

  return (
    <Container className="mt-5">
      <h4 className="feature-vendor-heading mb-3 text-center text-md-start ">Featured Vendors</h4>

      <div className="feature-vendor-wrapper position-relative">
        {showLeft && <button className="custom-arrow side1" onClick={() => scroll("left")}>&#10094;</button>}

        <div className="feature-vendor-row" ref={carouselRef}>
          {slides.map((vendor, idx) => (
            <article key={idx} className="feature-vendor-card">
              <div className="vendor-image-wrapper position-relative">
                <img src={vendor.img} alt={vendor.title} className="feature-vendor-image" />
                <div className="vendor-rating position-absolute top-0 end-0 bg-success px-2 py-1 rounded m-2 d-flex align-items-center gap-1 text-white">
                  <FaStar />
                  <span>{vendor.rating}</span>
                </div>
              </div>
              <h6 className="mt-2 fw-semibold">{vendor.title}</h6>
              <p className="feature-vendor-desc m-0">{vendor.desc}</p>
              <div className="d-flex mt-1">
                <p className="feature-vendor-price text-pink-600 fw-semibold">{vendor.price}</p>
                {vendor.quantity && <p className="feature-vendor-quantity ms-1 text-pink-600 text-sm">{vendor.quantity}</p>}
              </div>
            </article>
          ))}
        </div>

        {showRight && <button className="custom-arrow side2" onClick={() => scroll("right")}>&#10095;</button>}
      </div>
    </Container>
  );
}

export default FeatureVendor;
