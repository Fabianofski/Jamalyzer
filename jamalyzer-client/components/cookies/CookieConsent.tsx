"use client";
import React, { ReactElement, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import ReactGA from "react-ga4";
import styles from "./CookieConsent.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
const MESS_ID = "G-SW2RQ0Q5JJ";

interface Props {
  setIsCookieAnswered: React.Dispatch<boolean>;
}

function CookieConsentBanner(): ReactElement {
  const [isCookieAnswered, setIsCookieAnswered] = useState(true);

  useEffect(() => {
    setIsCookieAnswered(
      localStorage.getItem("isCookieConsentBannerAnswered") === "true"
    );
    if (
      localStorage.getItem("isCookieAnalyticalAccepted") === "true" &&
      isCookieAnswered
    ) {
      initGA();
    }
  }, [isCookieAnswered]);

  return (
    <>
      {isCookieAnswered ? (
        <></>
      ) : (
        <div className={styles.cookieContainer}>
          <MainBanner setIsCookieAnswered={setIsCookieAnswered} />
        </div>
      )}
    </>
  );
}

function initGA(): void {
  try {
    if (ReactGA.isInitialized) return;
    ReactGA.initialize(MESS_ID);
  } catch (err) {
    console.error(err);
  }
}

function MainBanner({ setIsCookieAnswered }: Props): ReactElement {
  const [marketing, setMarketing] = useState(false);
  const [analytical, setAnalytical] = useState(false);

  const answerBanner = (marketing: boolean, analytical: boolean): void => {
    localStorage.setItem("isCookieConsentBannerAnswered", "true");
    localStorage.setItem(
      "isCookieTargetedAdvertisingAccepted",
      String(marketing)
    );
    localStorage.setItem("isCookieAnalyticalAccepted", String(analytical));
    setIsCookieAnswered(true);
    if (!analytical && ReactGA.isInitialized) window.location.reload();
  };

  const acceptAll = (): void => {
    answerBanner(true, true);
  };
  const rejectAll = (): void => {
    answerBanner(false, false);
  };
  const applyOptions = (): void => {
    answerBanner(marketing, analytical);
  };

  return (
    <div className={styles.cookieBanner}>
      <h1 style={{ textAlign: "center" }}>🍪 We use Cookies!</h1>
      <div className={styles.toggles}>
        <Toggle
          cookieName={"Targeted Advertising Cookies"}
          description={
            "At Jamalyzer, we use targeted advertising cookies to track user interests and show personalized ads. This helps us deliver more relevant content and improves the effectiveness of our advertising campaigns."
          }
          option={marketing}
          setOption={setMarketing}
        />
        <Toggle
          cookieName={"Analytical Cookies"}
          description={
            "At Jamalyzer, we use analytical cookies to collect information about how users interact with our website. This helps us understand which pages are popular and how users navigate through the site."
          }
          option={analytical}
          setOption={setAnalytical}
        />
      </div>
      <div className={styles.cookieButtons}>
        <button onClick={applyOptions}>
          <b>APPLY</b>
        </button>
        <button onClick={rejectAll}>
          <b>REJECT ALL</b>
        </button>
        <button onClick={acceptAll}>
          <b>ACCEPT ALL</b>
        </button>
      </div>
    </div>
  );
}

interface ToggleProps {
  cookieName: string;
  description: string;
  option: boolean;
  setOption: React.Dispatch<boolean>;
}

function Toggle({
  cookieName,
  description,
  option,
  setOption,
}: ToggleProps): ReactElement {
  const [infoShown, setInfoShown] = useState(true);

  return (
    <div className={styles.cookieInfo}>
      <div className={styles.toggle}>
        <div className={styles.toggleInfo}>
          <button
            onClick={() => {
              setInfoShown(!infoShown);
            }}
            className={styles.collapseButton}
          >
            <FontAwesomeIcon icon={infoShown ? faCaretUp : faCaretDown} className={styles.collapseButtonIcon}/>
          </button>
          <p>{cookieName}</p>
        </div>
        <ToggleSwitch option={option} setOption={setOption} />
      </div>
      {infoShown && (
        <div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default CookieConsentBanner;
