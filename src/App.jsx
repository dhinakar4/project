import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import BusinesSignup from "./BusinesSignup";
import VendorSignup from "./VendorSignup";
import WMGservice from "./WMGservice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />      {/*  Home page */}
        <Route path="/login" element={<Login />} /> {/*  Login page */}
        <Route path="/business-signin" element={<BusinesSignup />} /> {/* Business Login */}
        <Route path="/search" element={< Search />} /> {/* search page*/}
      </Routes>
    </Router>

    // <VendorSignup />
  );
}

export default App;
