import "@/styles/App.css";
import "@/styles/home/HomeForm.css";
import "@/styles/home/HomeRecommended.css";
import "@/styles/home/HomeInfo.css";
import "@/styles/wireframe/Footer.css";
import "@/styles/wireframe/Nav.css";
import "@/styles/wireframe/ThemeSwitch.css";
import "@/styles/cookies/CookieConsent.css";
import "@/styles/cookies/ToggleSwitch.css";
import "@/styles/legal/Legal.css";
import "@/styles/legal/Credits.css";
import "@/styles/Loader.css";
import "@/styles/jam/Jam.css";
import "@/styles/jam/cards/Card.css";
import "@/styles/jam/cards/ToolTip.css";
import "@/styles/jam/components/Loader.css";
import "@/styles/jam/components/PaginationTable.css";
import "@/styles/jam/components/Sidebar.css";
import "@/styles/jam/views/View.css";
import type { AppProps } from "next/app";
import Nav from "@/components/wireframe/Nav";
import Footer from "@/components/wireframe/Footer";
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
    <div className="App">
      <Head>
        <link rel="shortcut icon" href="/jam.png" />
      </Head>
      <Nav />
      {!isCookieAnswered && (
        <CookieConsentBanner setIsCookieAnswered={setIsCookieAnswered} />
      )}
      <div className={"content"}>
        <Component {...pageProps} />
      </div>
      <Footer setIsCookieAnswered={setIsCookieAnswered} />
    </div>
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
