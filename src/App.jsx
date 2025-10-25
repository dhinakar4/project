import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menubar from './Menubar';
import Login from './Login';  // ← create this page

function App() {
  return (
    <Router>
      <Menubar />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />  {/* ✅ Login route */}
      </Routes>
    </Router>
  );
}

export default App;
