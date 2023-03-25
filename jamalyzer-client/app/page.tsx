import React, { ReactElement } from "react";
import HeroSection from "@/app/home/HeroSection";
import homeStyles from "@/styles/home/Home.module.css";
import HomeRecommended from "@/app/home/HomeRecommended";



function Home(): ReactElement {
  return (
    <div className={homeStyles.Home}>
      <title>Jamalyzer | Home</title>
      <HeroSection />
      <HomeRecommended />
    </div>
  );
}

export default Home;
