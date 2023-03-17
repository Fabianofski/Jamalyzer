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
import "@/styles/jobs/jobs.css";
import Nav from "@/components/wireframe/Nav";
import React from "react";
import { Metadata } from "next";
import Footer from "@/components/wireframe/Footer";
import CookieConsentBanner from "@/components/cookies/CookieConsent";

export const metadata: Metadata = {
  title: "Jamalyzer",
  icons: "/jam.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
