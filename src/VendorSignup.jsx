import signup from './assets/signup.png'
import { Link } from "react-router-dom";
import './VendorSignup.css'


function VendorSignup() {

    return (
        <div>

            <div className="vendor-signup-container">

                <div className="signup-left">
                    <img src={signup} alt="login" className="signup-img" />
                </div>

                <div className="signup-right">

                    <h3 className="signup-title">"Grow your Business with WedMeGood"
                        <p className="text-center pt-1" style={{ fontSize: '16px', fontWeight: '400' }}>Sign In to access your Dashboard</p>
                    </h3>

                    <>

                        <button className="signup-text">Continue </button>
                        <p className="register-vendor ">
                            Register as a Vendor?
                            <a href="#" className="sign-up ms-1">Sign up</a>
                        </p>

                    </>

                    <div className="customer">
                        <p className="customer-text ">
                            Are you a customer?
                            {/* <Link to="/login" className="customer-link"> Customer Sign In</Link> */}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default VendorSignup;
