import { useState } from "react";
import { Container } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import "./WeddingCategories.css";

import Img1 from "./assets/weddingcategories/img1.avif";
import Img2 from "./assets/weddingcategories/img2.avif";
import Img3 from "./assets/weddingcategories/img3.avif";
import Img4 from "./assets/weddingcategories/img4.avif";
import Img5 from "./assets/weddingcategories/img5.avif";
import Img6 from "./assets/weddingcategories/img6.avif";

function WeddingCategories() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const items = [
    { id: 1, title: "Venues", desc: "Banquet Halls", img: Img1, bg: "lavender" },
    { id: 2, title: "Photographers", desc: "Photographers", img: Img2, bg: "rgb(244, 211, 199)" },
    { id: 3, title: "Makeup", desc: "Bridal Makeup Artists", img: Img3, bg: "rgb(239, 191, 191)" },
    { id: 4, title: "Planning & Decor", desc: "Decorators", img: Img4, bg: "rgb(251, 187, 161)" },
    { id: 5, title: "Virtual Planning", desc: "Virtual Planning", img: Img5, bg: "rgb(250, 215, 202)" },
    { id: 6, title: "Mehndi", desc: "Mehndi Artists", img: Img6, bg: "rgb(240, 216, 185)" },
  ];

  return (
    <Container className="wedding-categories mt-5">
      <h4 className="text-xl font-semibold">Wedding Categories</h4>

      <div className="row mt-4">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-md-6 mb-3">
            {/* Card */}
            <div
              onClick={() => toggle(item.id)}
              className="category-texts relative cursor-pointer p-0 rounded shadow-sm w-100 
             h-[120px] md:h-[90px] lg:h-[120px] max-[480px]:h-[90px]"
              style={{ backgroundColor: item.bg }}
            >
              <img
                src={item.img}
                className="category-img"
                alt={item.title}
              />

              <div className="d-flex align-items-center gap-2 pt-3 ps-4 pe-4">
                <h5 className="text-[18px] md:text-[17px] sm:text-[16px] font-medium 
               whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h5>


                <FiChevronDown
                  className={`me-auto mb-1 text-[20px] transition-transform duration-300 ${open === item.id ? "rotate-180" : ""
                    }`}
                />
              </div>

              <p className="text-sm ps-4 pt-1">{item.desc}</p>
            </div>

            {/* Dropdown */}
            {open === item.id && (
              <div className="p-3 text-sm bg-white shadow animate-fadeIn ">
                <p className="text-gray-700 categories-all-text">{item.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>

  );
}

export default WeddingCategories;
