import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Jam from "./Jam";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./components/App.css";

function App() {
  return (
    <Router>
      <Nav />
      <div className="router">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jam/:jamName" element={<Jam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
