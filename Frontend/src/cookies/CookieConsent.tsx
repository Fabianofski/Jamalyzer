import React, {useState} from "react";
import "./CookieConsent.css";
import ToggleSwitch from "./ToggleSwitch";
import ReactGA from "react-ga4";

type Props = {
  setIsCookieAnswered: React.Dispatch<boolean>
}

function CookieConsentBanner({setIsCookieAnswered}:Props) {
  return (
    <div className="cookie-container">
      <MainBanner setIsCookieAnswered={setIsCookieAnswered}/>
    </div>
  );
}

function MainBanner({setIsCookieAnswered}:Props){
  const [marketing, setMarketing] = useState(false);
  const [analytical, setAnalytical] = useState(false);
  
  const answerBanner = (marketing:boolean, analytical:boolean) => {
    localStorage.setItem('isCookieConsentBannerAnswered', 'true');
    localStorage.setItem('isCookieTargetedAdvertisingAccepted', String(marketing));
    localStorage.setItem('isCookieAnalyticalAccepted', String(analytical));
    setIsCookieAnswered(true);
    if(!analytical && ReactGA.isInitialized)
      window.location.reload();
  };
  
  const acceptAll = () => answerBanner(true, true);
  const rejectAll = () => answerBanner(false, false);
  const applyOptions = () => answerBanner(marketing, analytical);
  
  
  return(
    <div className="cookie-banner">
      <h1 style={{textAlign:"center"}}>🍪 We use Cookies!</h1>
      <div className="toggles">
        <Toggle
          cookieName={"Targeted Advertising Cookies"}
          description={"At Jamalyzer, we use targeted advertising cookies to track user interests and show personalized ads. This helps us deliver more relevant content and improves the effectiveness of our advertising campaigns."}
          option={marketing}
          setOption={setMarketing}  />
        <Toggle
          cookieName={"Analytical Cookies"}
          description={"At Jamalyzer, we use analytical cookies to collect information about how users interact with our website. This helps us understand which pages are popular and how users navigate through the site."}
          option={analytical}
          setOption={setAnalytical}/>
      </div>
      <div className="cookie-buttons">
        <button onClick={applyOptions}><b>APPLY</b></button>
        <button onClick={rejectAll}><b>REJECT ALL</b></button>
        <button onClick={acceptAll}><b>ACCEPT ALL</b></button>
      </div>
    </div>
  );
}

type ToggleProps = {
  cookieName:string,
  description:string,
  option:boolean,
  setOption: React.Dispatch<boolean>,
}

function Toggle({cookieName, description, option, setOption}:ToggleProps){
  
  const [infoShown, setInfoShown] = useState(true);
  
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