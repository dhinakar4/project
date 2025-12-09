import React from "react";
import Container from "react-bootstrap/Container";
import "./WMGservice.css";
import Img1 from "./assets/WMGservice/img1.avif";
import Img2 from "./assets/WMGservice/img2.avif";
import Img3 from "./assets/WMGservice/img3.avif";

function WMGservice() {
  const services = [
    {
      img: Img1,
      title: "Wedsta",
      desc: "WMG At Home, Family Makeup Services",
    },
    {
      img: Img2,
      title: "Genie Services",
      desc: "Plan your dream wedding in your budget",
    },
    {
      img: Img3,
      title: "Venue Booking Service",
      desc: "Best Price Guaranteed",
    },
  ];

  return (
    <Container className="WMG-service mt-0 mt-md-4 p-md-5 p-3 ">
      <h5 className="WMG-heading">WMG Inhouse Services</h5>

      <div className="service-grid mt-[30px]">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-image-wrapper">
              <img
                src={service.img}
                alt={service.title}
                className="service-image"
              />
            </div>

            <h5 className="service-title mt-3">{service.title}</h5>
            <p className="service-desc">{service.desc}</p>
            <button className="service-btn ">Know More</button>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default WMGservice;
