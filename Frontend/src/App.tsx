import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Jam from "./jam/Jam";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Credits from "./legal/Credits";
import "./App.css";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import About from "./legal/About";
import CookieConsentBanner from "./cookies/CookieConsent";
import ReactGA from "react-ga4";

const MESS_ID = "G-SW2RQ0Q5JJ";

function App(): ReactElement {
  const [isCookieAnswered, setIsCookieAnswered] = useState(
    localStorage.getItem("isCookieConsentBannerAnswered") === "true"
  );

  useEffect(() => {
    if (localStorage.getItem("isCookieAnalyticalAccepted") === "true" && isCookieAnswered) {
      initGA();
    }
  }, [isCookieAnswered]);

  return (
    <Router>
      {!isCookieAnswered && <CookieConsentBanner setIsCookieAnswered={setIsCookieAnswered} />}
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
        <Footer setIsCookieAnswered={setIsCookieAnswered} />
      </div>
    </Router>
  );
}

function initGA(): void {
  try {
    if (ReactGA.isInitialized) return;
    ReactGA.initialize(MESS_ID);
    console.log("initialized");
  } catch (err) {
    console.error(err);
  }
}

export default App;
