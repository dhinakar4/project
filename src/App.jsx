import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import BusinesSignup from "./BusinesSignup";
import VendorSignup from "./VendorSignup";
import WMGservice from "./WMGservice";
import WeddingCategories from "./WeddingCategories";
import DownloadApp from "./DownloadApp";

function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />      
          <Route path="/login" element={<Login />} /> 
          <Route path="/business-signin" element={<BusinesSignup />} /> 
          <Route path="/search" element={<Search />} /> 
        </Routes>
      </Router>
     {/* <DownloadApp /> */}
      {/* <VendorSignup /> */}
    </div>
  );
}

export default App;
