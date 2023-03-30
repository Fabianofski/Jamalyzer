import React, { ReactElement } from "react";
import HeroSection from "@/app/home/HeroSection";
import homeStyles from "@/styles/home/Home.module.css";
import HomeRecommended from "./home/HomeRecommended";
import { jamCard } from "@/model/jamData/jamCard";
import jamList from "@/public/jamList.json";

function shuffle(array: jamCard[]): jamCard[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const jams = shuffle(jamList.jams);

function Home(): ReactElement {
  return (
    <div className={homeStyles.Home}>
      <title>Jamalyzer | Home</title>
      <HeroSection />
      <HomeRecommended jams={jams} />
    </div>
  );
}

export default Home;
