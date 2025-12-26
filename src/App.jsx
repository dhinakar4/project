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

// NEW FILES YOU MUST CREATE
import Layout from "./components/Layout";
import VenueList from "./pages/VenueList";
import VenueDetails from "./pages/VenueDetails";
import PopularSearchList from "./PopularSearch";

import PrivateRoute from "./components/PrivateRoute";
import Shortlist from "./pages/Shortlist";


function App() {
  return (
    <Router>
      <Routes>

        {/* Pages without Layout (simple screens) */}
        <Route path="/login" element={<Login />} />
        <Route path="/business-signin" element={<BusinesSignup />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/search" element={<Search />} />


        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<VenueList />} />     {/* Popular search category pages */}
          <Route path="/venue/:id" element={<VenueDetails />} />     {/* Single venue details */}

          {/* 🔐 PROTECTED ROUTE */}
          <Route
            path="/shortlist"
            element={
              <PrivateRoute>
                <Shortlist />
              </PrivateRoute>
            }
          />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
