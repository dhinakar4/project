import React, { useState } from "react";
import Menubar from "./Menubar";
import "./Login.css";
import loginimg from "./assets/login.webp";
import { IoMdContact } from "react-icons/io";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";


function Login() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <Menubar />

            <div className="login-container">

                <div className="login-left">
                    <img src={loginimg} alt="login" className="login-img" />
                    <h2 className="login-heading">
                        India’s Favourite <br /> Wedding Planning <br /> Platform
                    </h2>
                </div>

                <div className="login-right">

                    <h3 className="signin-title">Sign In/Sign Up</h3>

                    <div
                        className={`input-group ${isFocused ? "input-active" : ""}`}
                    >
                        <IoMdContact className="input-icon" />
                        <div className="divider-line "></div>

                        <input
                            type="text"
                            placeholder="Enter email or mobile*"
                            className="login-input"
                            onFocus={() => setIsFocused(true)}
                        />
                    </div>


                    {isFocused && (
                        <p className="back-text" onClick={() => setIsFocused(false)}>
                            &lt; Back
                        </p>
                    )}

                    {!isFocused && (
                        <>
                            <div className="divider mt-5">
                                <span>OR</span>
                            </div>

                            <p className="continue-text">Continue With</p>

                            <div className="social-buttons">
                                <button className="social-btn"
                                    onClick={() => (window.location.href = "https://www.facebook.com/login")} >
                                    <FaFacebookF className="social-icon fb" />
                                    Facebook
                                </button>
                                <button className="social-btn"
                                    onClick={() => (window.location.href = "https://accounts.google.com/o/oauth2/v2/auth")} >
                                    <FaGoogle className="social-icon google" />
                                    Google
                                </button>
                            </div>
                        </>
                    )}

                    <p className="vendor-text">
                        Are you a vendor?
                        <Link to="/business-signin" className="vendor-link"> Business Sign In</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;
