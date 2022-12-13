import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Jam from "./Jam";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Credits from "./Credits";
import "./components/App.css";
import PrivacyPolicy from "./PrivacyPolicy";
import About from "./About";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jam/:jamName" element={<Jam />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
