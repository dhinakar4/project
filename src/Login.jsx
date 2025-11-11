import Menubar from "./Menubar";
import "./Login.css"
import loginimg from './assets/login.webp';

function Login() {
    return(
        <div>
            <Menubar />
            <div className="centered mt-4 pt-1">
                <img src={loginimg} alt="login" className="login-img" />
                <div>
                    <h2 className="login-heading">India's Favorite <br /> Wedding Planning<br /> Platform</h2>
                </div>
            </div>
        </div>
    )
} export default Login;