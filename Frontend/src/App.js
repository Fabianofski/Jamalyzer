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
      <div className="App">
        <Nav />
        <div className="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jam/:jamName" element={<Jam />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
