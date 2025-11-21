import { HiLightBulb } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RiAppleFill } from "react-icons/ri";
import { DiAndroid } from "react-icons/di";
import "./DownloadApp.css";
import { useState } from "react";
import downloadimg from "./assets/appimage.avif";

function DownloadApp() {
  const [phone, setPhone] = useState("+91");

  const handleChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/\D/g, "");
    } else {
      value =
        "+91" +
        value
          .replace("+91", "")
          .replace(/\D/g, "");
    }
    setPhone(value);
  };

  return (
    <div className="py-5">
      <div className="app-download container p-4 p-md-5">

        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-12 col-md-7">

            <h5 className="fw-bold mb-3" style={{ fontSize: "22px" }}>
              Download The WedMeGood Mobile App Today!
            </h5>

            {/* Icons Row */}
            <div className="d-flex align-items-center icon-colors flex-wrap gap-2">

              <span className="d-flex align-items-center">
                <HiLightBulb size={24} className="me-1" />
                Save Wedding Ideas
              </span>

              <span className="d-flex align-items-center ms-md-3">
                <IoHeartSharp size={22} className="me-1" />
                Shortlist Vendors
              </span>

              <span className="d-flex align-items-center ms-md-3">
                <BsFillBagCheckFill size={18} className="me-1" />
                Free Wedding Checklist
              </span>

            </div>

            <p className="fw-semibold mt-4">
              You will receive an SMS with a link to download the App
            </p>

            {/* Phone Input */}
            <div className="d-flex align-items-center border-bottom pb-1 w-100 w-md-75">
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="me-2"
              />

              <input
                type="tel"
                maxLength={14}
                value={phone}
                onChange={handleChange}
                className="phone-input flex-grow-1"
              />
            </div>

            {/* Button */}
            <button className="download-btn text-white fw-semibold px-4 py-2 mt-4">
              <span className="button-text">Download the App</span>
            </button>

            {/* App Icons */}
            <div className="d-flex align-items-center mt-3">
              <RiAppleFill size={28} />
              <DiAndroid size={28} className="ms-2" />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-12 col-md-5 text-center mt-4 mt-md-0">
            <img
              src={downloadimg}
              alt="download app"
              className="img-fluid app-img"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default DownloadApp;
