import React, { ReactElement } from "react";
import HeroSection from "@/app/home/HeroSection";
import homeStyles from "@/styles/home/Home.module.css";
import HomeRecommended from "./home/HomeRecommended";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jamalyzer | Home",
};

function Home(): ReactElement {
  return (
    <div className={homeStyles.Home}>
      <HeroSection />
      <HomeRecommended />
    </div>
  );
}

export default Home;
