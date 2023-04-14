"use client";
import React, { ReactElement } from "react";
import styles from "./Footer.module.css";
import creditsStyles from "@/styles/legal/Credits.module.css";

function Footer(): ReactElement {
  const openCookies = (): void => {
    localStorage.setItem("isCookieConsentBannerAnswered", "false");
    window.location.reload();
  };

  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        <h3>©F4B1 - 2023</h3>
        <a
          className={styles.link}
          href={"https://www.github.com/fabianofski"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            }
            alt={`GitHub Icon`}
            className={creditsStyles.icon}
          />
        </a>
        <a
          className={styles.link}
          href={"https://f4b1.itch.io/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"https://static.itch.io/images/itchio-textless-black.svg"}
            alt={`Itch.io Icon`}
            className={creditsStyles.icon}
          />
        </a>
      </div>
      <div className={styles.categories}>
        <div className={styles.category}>
          <p style={{ fontWeight: "bold" }}>Legal</p>
          <a onClick={openCookies} href="#cookies">
            Cookies
          </a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className={styles.category}>
          <p style={{ fontWeight: "bold" }}>Jamalyzer</p>
          <a href="/about">About</a>
          <a href="/credits">Credits</a>
        </div>
        <div className={styles.category}>
          <p style={{ fontWeight: "bold" }}>Contact</p>
          <a href="mailto:support@jamalyzer.com">support@jamalyzer.com</a>
          <a href={"https://github.com/Fabianofski/Jamalyzer"}>GitHub Repo</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
