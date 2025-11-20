import './RealWedding.css'
import Container from "react-bootstrap/Container";
import React, { useRef, useEffect, useState } from "react";
import img1 from './assets/realwedding/img1.avif';
import img2 from './assets/realwedding/img2.avif';
import img3 from './assets/realwedding/img3.avif';
import img4 from './assets/realwedding/img4.avif';
import img5 from './assets/realwedding/img5.avif';

function RealWedding() {

    const baseSlides = [
        {
            img: img1, title: 'Rupanshi and Yash',
            desc: 'A Deeply Personalished Mumbai Wedding That Was A Guest-First Celebration!',
            date: '18 January 2025'
        },
        {
            img: img2, title: 'Natasia and Jeet',
            desc: 'A Breezy,Nature-Filled Wedding In Mumbai That Redefines Romantic Minimalim!',
            date: '21 Febraury 2025'
        },
        {
            img: img3, title: 'Palak and Aarjav',
            desc: 'A Mumbai Wedding With Vintage Coulture & A Rom-Com-Style NYC Elopement',
            date: '03 June 2025'
        },
        {
            img: img4, title: 'Shradha and Nitesh',
            desc: "This Celebrity MUA's Ethereal Roka Came With 3 Dreamy Celebrations You Can't Miss!",
            date: '16 July 2025'
        },
        {
            img: img5, title: 'Sanam and Mohit',
            desc: 'Seaside Terrace Wedding At Home With A Bride Who Rocked A Neon Lehenga!',
            date: '22 December 2025'
        }
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
        <Container className='p-4 mt-5'>
            <div className="wedding-title text-[22px] font-semibold ">Real Wedding Stories</div>
            <div className="real-wedding-wrapper pt-[10px]">
                {showLeft && (
                    <button
                        className="custom-arrow left"
                        onClick={() => scroll("left")}
                    >
                        &#10094;
                    </button>
                )}

                <div className="real-wedding-row" ref={carouselRef}>
                    {slides.map((slide, index) => (
                        <div key={index} className="real-wedding-card">
                            <div className="wedding-image-wrapper">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="real-wedding-image"
                                />
                            </div>
                            <div className='mt-2'>
                                <span className="stories-title ms-4">{slide.title}  </span>
                                <p className='real-wedding-desc w-[400px] pl-6 pt-2'>{slide.desc}</p>
                                <p className='real-wedding-date pl-6 text-[12px] font-semibold'>{slide.date}</p>
                            </div>
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
    )
}; export default RealWedding;