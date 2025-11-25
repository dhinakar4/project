import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import BusinesSignup from "./BusinesSignup";
import VendorSignup from "./VendorSignup";
import WMGservice from "./WMGservice";
import WeddingCategories from "./WeddingCategories";
import DownloadApp from "./DownloadApp";
import VenueSearch from "./VenueSearch";
import PopularSearch from "./PopularSearch";
import RealWedding from "./RealWedding";
import Gallery from "./Gallery";
import FeatureVendor from "./FeatureVendor";
import LatestBlogs from "./LatestBlogs";
import ContactPage from "./ContactPage";

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
      {/* <Gallery /> */}
      {/* <FeatureVendor /> */}
      {/* <LatestBlogs /> */}
      {/* <ContactPage /> */}
    </div>
  );
}

export default App;
