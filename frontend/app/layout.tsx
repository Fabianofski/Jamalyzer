import "@/styles/Fonts.css";
import "@/styles/Colors.css";
import "@/styles/App.css";
import "@/styles/jam/cards/Card.css";
import Nav from "@/app/wireframe/Nav";
import React from "react";
import { Metadata } from "next";
import Footer from "@/app/wireframe/Footer";
import CookieConsentBanner from "@/app/cookies/CookieConsent";
import { setPreferredColorScheme } from "@/utilities/Color/ColorManager";

export const metadata: Metadata = {
  title: "Jamalyzer",
  icons: "/favicon.png",
  description: `Jamalyzer - the ultimate game jam analysis tool! Analyze game 
                jams like never before, see what tools were used, what genres 
                and tags were most popular, and more. Try it now for free!`,
  themeColor: "#f55a5b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set preferred colorscheme before body renders to avoid dark mode flicker
  // function needs to be a string to inject script
  const colorFunction =
    'let colorScheme = "light"; ' +
    String(setPreferredColorScheme) +
    " setPreferredColorScheme();";

  return (
    <html lang="en" data-theme="light">
      <body>
        <script dangerouslySetInnerHTML={{ __html: colorFunction }} />
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
