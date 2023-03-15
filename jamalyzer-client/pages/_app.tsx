import "@/styles/App.css";
import "@/styles/Home/HomeForm.css";
import "@/styles/Home/HomeRecommended.css";
import "@/styles/Home/HomeInfo.css";
import "@/styles/Wireframe/Footer.css";
import "@/styles/Wireframe/Nav.css";
import "@/styles/Wireframe/ThemeSwitch.css";
import type { AppProps } from "next/app";
import Nav from "@/components/Wireframe/Nav";
import Footer from "@/components/Wireframe/Footer";
import { setPreferredColorScheme } from "@/components/Color/ColorManager";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
const MESS_ID = "G-SW2RQ0Q5JJ";

export default function App({ Component, pageProps }: AppProps) {
  const [isCookieAnswered, setIsCookieAnswered] = useState(false);

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
    <div>
      <Nav />
      <Component {...pageProps} />{" "}
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
