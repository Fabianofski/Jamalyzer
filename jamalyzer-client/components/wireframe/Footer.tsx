import React, { ReactElement } from "react";

interface Props {
  setIsCookieAnswered: React.Dispatch<boolean>;
}

function Footer({ setIsCookieAnswered }: Props): ReactElement {
  const openCookies = (): void => {
    localStorage.setItem("isCookieConsentBannerAnswered", "false");
    setIsCookieAnswered(false);
  };

  return (
    <div className="footer">
      <a href="/credits">Credits</a>
      <a href="/about">About</a>
      <a onClick={openCookies} href="#cookies">
        Cookies
      </a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );
}

export default Footer;
