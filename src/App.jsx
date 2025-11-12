import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";      
import Login from "./Login";
import Search from "./Search";
import PopularSearch from "./PopularSearch";
import VenueSearch from "./VenueSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />      {/*  Home page */}
        <Route path="/login" element={<Login />} /> {/*  Login page */}
        <Route path="/search" element={< Search />} /> {/* search page*/}
      </Routes>
    </Router>
    // <PopularSearch />
    // <VenueSearch />
  );
}

export default App;
