import React, {useState} from "react";
import "./CookieConsent.css";
import {Switch} from "react-bootstrap";
import ToggleSwitch from "./ToggleSwitch";

function CookieConsentBanner({setIsCookieAnswered}) {
  return (
    <div className="cookie-container">
      <MainBanner setIsCookieAnswered={setIsCookieAnswered}/>
    </div>
  );
}

function MainBanner({setIsCookieAnswered}){
  const answerBanner = (decision) => {
    localStorage.setItem('isCookieConsentBannerAnswered', 'true');
    localStorage.setItem('isCookieConsentBannerAccepted', decision);
    setIsCookieAnswered(true);
  };
  
  const [functional, setFunctional] = useState(true);
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);
  const [test3, setTest3] = useState(true);
  const [test4, setTest4] = useState(true);
  
  return(
    <div className="cookie-banner">
      <p>
        This website uses cookies to improve your user experience. By using our website, you agree to the use of cookies.
      </p>
      <div className="toggles">
        <Toggle cookieName={"Test Cookies"} setOption={setTest1}/>
        <Toggle cookieName={"Test Cookies"} setOption={setTest2}/>
        <Toggle cookieName={"Test Cookies"} setOption={setTest3}/>
        <Toggle cookieName={"Test Cookies"} setOption={setTest4}/>
        <Toggle cookieName={"Functional Cookies"} setOption={setFunctional}/>
      </div>
      <div className="cookie-buttons">
        <button onClick={()=>answerBanner('true')}><b>ACCEPT ALL</b></button>
        <button onClick={()=>answerBanner('false')}><b>REJECT ALL</b></button>
        <button onClick={()=>console.log("Apply")}><b>APPLY</b></button>
      </div>
    </div>
  );
}

function Toggle({cookieName, setOption}){
  return (
    <div className="toggle">
      <p>{cookieName}</p>
      <ToggleSwitch setOption={setOption}/>
    </div>
  );
}

export default CookieConsentBanner;