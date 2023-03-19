import "@/styles/App.css";
import "@/styles/home/HomeForm.css";
import "@/styles/home/HomeRecommended.css";
import "@/styles/home/HomeInfo.css";
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
import "@/styles/jobs/jobs.css";
import Nav from "@/components/wireframe/Nav";
import React from "react";
import { Metadata } from "next";
import Footer from "@/components/wireframe/Footer";
import CookieConsentBanner from "@/components/cookies/CookieConsent";
import { setPreferredColorScheme } from "@/utilities/Color/ColorManager";

export const metadata: Metadata = {
  title: "Jamalyzer",
  icons: "/jam.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Set preferred colorscheme before body renders to avoid dark mode flicker
  // function needs to be a string to inject script
  const colorFunction = String(setPreferredColorScheme) + " setPreferredColorScheme();";

  return (
    <html lang="en" data-theme="light">
      <body>
      <script dangerouslySetInnerHTML={{__html: colorFunction}}/>
        <div className={"App"}>
          <CookieConsentBanner />
          <Nav />
          <div className={"content"}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
