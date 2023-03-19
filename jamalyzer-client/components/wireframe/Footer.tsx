"use client";
import React, { ReactElement } from "react";
import styles from "./Footer.module.css";

function Footer(): ReactElement {
  const openCookies = (): void => {
    localStorage.setItem("isCookieConsentBannerAnswered", "false");
    window.location.reload();
  };

  return (
    <div className={styles.footer}>
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
