import React from "react";
import "../App.css";

type Props = {
  setIsCookieAnswered: React.Dispatch<boolean>
}

function Footer({setIsCookieAnswered}: Props) {

  const openCookies = () => {
    localStorage.setItem('isCookieConsentBannerAnswered', 'false');
    setIsCookieAnswered(false);
  }

  return (
    <div className="footer">
      <a href="/credits">Credits</a>
      <a href="/about">About</a>
      <a onClick={openCookies} href="#cookies">Cookies</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );
}

export default Footer;
