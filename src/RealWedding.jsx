import './RealWedding.css';
import Container from "react-bootstrap/Container";
import React, { useRef, useEffect, useState } from "react";
import img1 from './assets/realwedding/img1.avif';
import img2 from './assets/realwedding/img2.avif';
import img3 from './assets/realwedding/img3.avif';
import img4 from './assets/realwedding/img4.avif';
import img5 from './assets/realwedding/img5.avif';

function RealWedding() {
  const baseSlides = [
    { img: img1, title: 'Rupanshi and Yash', desc: 'A Deeply Personalished Mumbai Wedding That Was A Guest-First Celebration!', date: '18 January 2025' },
    { img: img2, title: 'Natasia and Jeet', desc: 'A Breezy, Nature-Filled Wedding In Mumbai That Redefines Romantic Minimalism!', date: '21 February 2025' },
    { img: img3, title: 'Palak and Aarjav', desc: 'A Mumbai Wedding With Vintage Couture & A Rom-Com-Style NYC Elopement', date: '03 June 2025' },
    { img: img4, title: 'Shradha and Nitesh', desc: "This Celebrity MUA's Ethereal Roka Came With 3 Dreamy Celebrations You Can't Miss!", date: '16 July 2025' },
    { img: img5, title: 'Sanam and Mohit', desc: 'Seaside Terrace Wedding At Home With A Bride Who Rocked A Neon Lehenga!', date: '22 December 2025' }
  ];

  // Duplicate slides for infinite effect
  const slides = [...baseSlides, ...baseSlides, ...baseSlides];

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);
  const hasScrolledRight = useRef(false);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".real-wedding-card");
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
      const updatedFirst = el.querySelector(".real-wedding-card");
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
    <Container className=" p-md-2 mt-4 real-wedding-container">
      <h4 className="wedding-title mb-3 text-center text-md-start">Real Wedding Stories</h4>

      <div className="real-wedding-wrapper">
        {showLeft && (
          <button className="custom-arrow lefter" onClick={() => scroll("left")} aria-label="Previous">
            &#10094;
          </button>
        )}

        <div className="real-wedding-row" ref={carouselRef}>
          {slides.map((slide, index) => (
            <article key={index} className="real-wedding-card" role="group" aria-label={slide.title}>
              <div className="wedding-image-wrapper">
                <img src={slide.img} alt={slide.title} className="real-wedding-image img-fluid" />
              </div>

              <div className="card-body px-3 pt-2">
                <h6 className="stories-title mb-1">{slide.title}</h6>
                <p className="real-wedding-desc mb-3">{slide.desc}</p>
                <p className="real-wedding-date small fw-semibold mb-0">{slide.date}</p>
              </div>
            </article>
          ))}
        </div>

        {showRight && (
          <button className="custom-arrow righter" onClick={() => scroll("right")} aria-label="Next">
            &#10095;
          </button>
        )}
      </div>
    </Container>
  );
}

export default RealWedding;
