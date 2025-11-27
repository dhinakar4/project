import { HiLightBulb } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RiAppleFill } from "react-icons/ri";
import { DiAndroid } from "react-icons/di";
import "./DownloadApp.css";
import { useState } from "react";
import downloadimg from "./assets/appimage.avif";
import { Container } from "react-bootstrap";

function DownloadApp() {
  const [phone, setPhone] = useState("+91");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value.startsWith("91")) {
      value = "91" + value;
    }

    value = "+91" + value.slice(2, 12);

    setPhone(value);

    if (value.length !== 13) {
      setError("Please enter a valid phone number!");
    } else {
      setError("");
    }
  };
  const handleDownload = () => {
    if (!phone.length !== 13) {
      setError("Please enter a valid phone number!");
    } else {
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Meassage sent!")
  };
  return (
    <Container className="mt-5">
      <div className="app-download container p-4 p-md-5">

        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-12 col-md-7 ps-5">

            <h5 className="fw-semibold mb-3" style={{ fontSize: "22px" }}>
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
            <div className="d-flex align-items-center pb-1 w-50 w-md-75">
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="me-2 border-bottom border-dark pb-1 pr-2 pt-[6px]"
              />

              <input
                type="tel"
                maxLength={13}
                value={phone}
                onChange={handleChange}
                className="phone-input flex-grow-1 border-bottom border-dark"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {error}
              </p>
            )}

            {/* Button */}
            <button className="download-btn text-white fw-semibold  mt-5 h-50 p-[15px] w-[250px]"
              onClick={handleDownload}>
              <span className="button-text">Download the App</span>
            </button>

            {/* App Icons */}
            <div className="d-flex align-items-center mt-3 ml-[60px]">
              <RiAppleFill size={28} />
              <DiAndroid size={28} className="ms-2" />
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-12 col-md-5 text-center mt-4 mt-md-0 ">
            <img
              src={downloadimg}
              alt="download app"
              className="img-fluid app-img mx-auto"
            />
          </div>

        </div>
         {/* Success Message */}
            {success && (
              <p style={{ color: "green", fontSize: "14px",fontWeight:"500" }}>
                {success}
              </p>
            )}

      </div>
    </Container>
  );
}

export default DownloadApp;
