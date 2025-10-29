import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";      // ✅ import the new Home component
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />      {/* ✅ Home page */}
        <Route path="/login" element={<Login />} /> {/* ✅ Login page */}
      </Routes>
    </Router>
  );
}

export default App;
