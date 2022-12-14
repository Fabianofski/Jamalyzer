import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Jam from "./Jam";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Credits from "./Credits";
import "./components/App.css";
import PrivacyPolicy from "./PrivacyPolicy";
import About from "./About";
import CookieConsentBanner from "./components/CookieConsent";

function App() {
  const isCookieConsentBannerAnswered = localStorage.getItem('isCookieConsentBannerAnswered') === 'true';
  const isCookieConsentBannerAccepted = localStorage.getItem('isCookieConsentBannerAccepted');
  console.log(isCookieConsentBannerAccepted);
  const [isCookieAnswered, setIsCookieAnswered] = useState(isCookieConsentBannerAnswered);
  
  return (
    <Router>
      { !isCookieAnswered ? <CookieConsentBanner setIsCookieAnswered={setIsCookieAnswered}/> : null}
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
