import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Jam from "./jam/Jam";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Credits from "./legal/Credits";
import "./App.css";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import About from "./legal/About";
import CookieConsentBanner from "./cookies/CookieConsent";

function App() {
  const isCookieConsentBannerAnswered = localStorage.getItem('isCookieConsentBannerAnswered') === 'true';
  const [isCookieAnswered, setIsCookieAnswered] = useState(isCookieConsentBannerAnswered);
  
  return (
    <Router>
      { !isCookieAnswered && <CookieConsentBanner setIsCookieAnswered={setIsCookieAnswered}/>}
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
        <Footer setIsCookieAnswered={setIsCookieAnswered}/>
      </div>
    </Router>
  );
}

export default App;
