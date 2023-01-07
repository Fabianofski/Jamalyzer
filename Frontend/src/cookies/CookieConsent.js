import React, {useState} from "react";
import "./CookieConsent.css";
import ToggleSwitch from "./ToggleSwitch";

function CookieConsentBanner({setIsCookieAnswered}) {
  return (
    <div className="cookie-container">
      <MainBanner setIsCookieAnswered={setIsCookieAnswered}/>
    </div>
  );
}

function MainBanner({setIsCookieAnswered}){
  const [functional, setFunctional] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [analytical, setAnalytical] = useState(true);
  
  const answerBanner = (functional, marketing, analytical) => {
    localStorage.setItem('isCookieConsentBannerAnswered', 'true');
    localStorage.setItem('isCookieFunctionalAccepted', String(functional));
    localStorage.setItem('isCookieMarketingAccepted', String(marketing));
    localStorage.setItem('isCookieAnalyticalAccepted', String(analytical));
    setIsCookieAnswered(true);
  };
  
  const acceptAll = () => answerBanner(true, true, true);
  const rejectAll = () => answerBanner(false, false, false);
  const applyOptions = () => answerBanner(functional, marketing, analytical);
  
  
  return(
    <div className="cookie-banner">
      <p>
        This website uses cookies to improve your user experience. By using our website, you agree to the use of cookies.
      </p>
      <div className="toggles">
        <Toggle
          cookieName={"Marketing cookies"}
          description={"These cookies are used to display personalized advertisements"}
          option={marketing}
          setOption={setMarketing}  />
        <Toggle
          cookieName={"Analytical cookies"}
          description={"Analytical cookies help us understand how customers like you use Jamalyzer.com. This means we can improve our website, apps, and communications, and ensure we continue to be interesting and relevant."}
          option={analytical}
          setOption={setAnalytical}/>
        <Toggle
          cookieName={"Functional cookies"}
          description={"Functional cookies enable our website to work properly."}
          option={functional}
          setOption={setFunctional}/>
      </div>
      <div className="cookie-buttons">
        <button onClick={acceptAll}><b>ACCEPT ALL</b></button>
        <button onClick={rejectAll}><b>REJECT ALL</b></button>
        <button onClick={applyOptions}><b>APPLY</b></button>
      </div>
    </div>
  );
}

function Toggle({cookieName, description, option, setOption}){
  
  const [infoShown, setInfoShown] = useState(false);
  
  return (
    <div className="cookie-info">
      <div className="toggle">
        <div className="toggle-info">
          <button onClick={()=>setInfoShown(!infoShown)} className="collapse-button">
            <i className={`collapse-button-icon fa fa-2x ${infoShown ? "fa-caret-up" : "fa-caret-down"}`}></i>
          </button>
          <p>{cookieName}</p>
        </div>
        <ToggleSwitch option={option} setOption={setOption}/>
      </div>
      {infoShown &&
        <div>
          <p>{description}</p>
        </div>
      }
    </div>
  );
}

export default CookieConsentBanner;