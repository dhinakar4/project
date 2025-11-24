import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import "./FeatureVendor.css";

import img1 from "./assets/featurevendor/img1.avif";
import img2 from "./assets/featurevendor/img2.avif";
import img3 from "./assets/featurevendor/img3.avif";
import img4 from "./assets/featurevendor/img4.avif";
import img5 from "./assets/featurevendor/img5.avif";
import img6 from "./assets/featurevendor/img6.avif";

function FeatureVendor() {

    const slides = [
        { img: img1, title: "Novotel Mumbai International Airport", desc: 'Wedding Venues, Marol', price: '₹ 1,00,000', quantity: 'per function', rating: '4.9' },
        { img: img2, title: "Makeup Artistry By Drishti", desc: 'Bridal Makeup Artists', price: '₹ 16,500', rating: '5.0' },
        { img: img3, title: "Whistling Woodzs Jungle Resort", desc: 'Wedding Venues', price: 'Rental Only', rating: '4.8' },
        { img: img4, title: "The Royal Ark", desc: 'Wedding Venues', price: '₹ 1,500', quantity: 'per plate', rating: '4.6' },
        { img: img5, title: "Velvet Veil Beautys", desc: 'Bridal Makeup Artists', price: '₹ 2,00,000', rating: '4.9' },
        { img: img6, title: "Tarangi Hotels & Resorts", desc: 'Wedding Venues', price: '₹ 4,500 onwards', rating: '4.7' },
    ];

    // Grouping into sets of 3 for desktop
    const chunk = (arr, size) => arr.reduce((acc, _, i) =>
        (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

    const groupedSlides = chunk(slides, 3);

    return (
        <Container className="mt-5">
            <h4 className="feature-vendor-heading fw-semibold mb-3">Featured Vendors</h4>

            <Carousel indicators={false}>
                {groupedSlides.map((group, i) => (
                    <Carousel.Item key={i}>
                        <Row className="g-4">

                            {group.map((vendor, idx) => (
                                <Col key={idx} xs={12} md={6} lg={4}>
                                    <div className="feature-vendor-card p-2 rounded-3 relative cursor-pointer d-flex  flex-column">

                                        <div className="absolute top-2 right-2 bg-green-600 px-2 py-1 rounded-sm flex items-center gap-1 mt-2 mr-2">
                                            <FaStar className="text-white text-lg" />
                                            <span className="text-white text-sm font-semibold">{vendor.rating}</span>
                                        </div>

                                        <img
                                            src={vendor.img}
                                            alt={vendor.title}
                                            className="img-fluid rounded-3 feature-vendor-image"
                                        />

                                        <h6 className="mt-2 fw-semibold">{vendor.title}</h6>
                                        <p className="feature-vendor-desc m-0 text-sm">{vendor.desc}</p>

                                        <div className="d-flex mt-1">
                                            <p className="feature-vendor-price">{vendor.price}</p>
                                            <p className="feature-vendor-quantity ms-1 text-muted !mt-[1px]">{vendor.quantity}</p>
                                        </div>
                                    </div>
                                </Col>
                            ))}

                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default FeatureVendor;
