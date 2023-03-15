import "@/styles/App.css";
import "@/styles/Home/HomeForm.css";
import "@/styles/Home/HomeRecommended.css";
import "@/styles/Home/HomeInfo.css";
import "@/styles/Wireframe/Footer.css";
import "@/styles/Wireframe/Nav.css";
import "@/styles/Wireframe/ThemeSwitch.css";
import "@/styles/cookies/CookieConsent.css";
import "@/styles/cookies/ToggleSwitch.css";
import type { AppProps } from "next/app";
import Nav from "@/components/Wireframe/Nav";
import Footer from "@/components/Wireframe/Footer";
import { setPreferredColorScheme } from "@/utilities/Color/ColorManager";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import Head from "next/head";
import CookieConsentBanner from "@/components/cookies/CookieConsent";
const MESS_ID = "G-SW2RQ0Q5JJ";

export default function App({ Component, pageProps }: AppProps) {
  const [isCookieAnswered, setIsCookieAnswered] = useState(true);

  useEffect(() => {
    setIsCookieAnswered(
      localStorage.getItem("isCookieConsentBannerAnswered") === "true"
    );
    setPreferredColorScheme();
    if (
      localStorage.getItem("isCookieAnalyticalAccepted") === "true" &&
      isCookieAnswered
    ) {
      initGA();
    }
  }, [isCookieAnswered]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/jam.png" />
      </Head>
      <Nav />
      {!isCookieAnswered && (
        <CookieConsentBanner setIsCookieAnswered={setIsCookieAnswered} />
      )}
      <Component {...pageProps} />{" "}
      <Footer setIsCookieAnswered={setIsCookieAnswered} />
    </>
  );
}

function initGA(): void {
  try {
    if (ReactGA.isInitialized) return;
    ReactGA.initialize(MESS_ID);
    console.log("initialized");
  } catch (err) {
    console.error(err);
  }
}
