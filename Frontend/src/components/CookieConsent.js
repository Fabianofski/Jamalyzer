import React, {useState} from "react";
import "./CookieConsent.css";

function CookieConsentBanner({setIsCookieAnswered}) {
  
  const [isInCookieEdit, setIsInCookieEdit] = useState(false);
  const answerBanner = (decision) => {
    localStorage.setItem('isCookieConsentBannerAnswered', 'true');
    localStorage.setItem('isCookieConsentBannerAccepted', decision);
    setIsCookieAnswered(true);
  };
  
  return (
    <div className="cookie-container">
      {!isInCookieEdit ?
        <MainBanner answerBanner={answerBanner} setIsInCookieEdit={setIsInCookieEdit}/>
        : <EditBanner answerBanner={answerBanner} setIsCookieAnswered={setIsCookieAnswered} />}
    </div>
  );
}

function MainBanner({setIsInCookieEdit, answerBanner}){
  return(
    <div className="cookie-banner">
      <p>
        This website uses cookies to improve your user experience. By using our website, you agree to the use of cookies.
      </p>
      <div className="cookie-buttons">
        <button onClick={()=>answerBanner('true')}>ACCEPT ALL</button>
        <button onClick={()=>answerBanner('false')}>REJECT ALL</button>
        <button onClick={()=>setIsInCookieEdit(true)}>CUSTOMIZE</button>
      </div>
    </div>
  );
}

function EditBanner({answerBanner}){
  return(
    <div className="cookie-banner">
      <p>
        Edit Page broo
      </p>
      <div className="cookie-buttons">
        <button onClick={()=>console.log(true)}>SUBMIT</button>
        <button onClick={()=>answerBanner('true')}>ACCEPT ALL</button>
        <button onClick={()=>answerBanner('false')}>REJECT ALL</button>
      </div>
    </div>
  );
}

export default CookieConsentBanner;