"use client";
import React from "react";
import styles from "@/styles/home/HeroSection.module.css";
import Image from "next/image";
import HomeForm from "@/app/home/HomeForm";

function HeroSection() {

  return (
    <div className={styles["hero-section"]}>
      <h1>
        ANALYZE YOUR <br />
        FAVOURITE GAME JAMS!
      </h1>
      <p>
        Our mission is to provide valuable insights and statistics on the game <br />
        development community by collecting data from various game jams and <br />
        presenting it in an easy-to-understand format.
      </p>
      <HomeForm />
      <Image src={"/hero-banner.jpg"} alt={"hero-banner"} width={4000} height={4000} className={styles["hero-banner"]}/>
      <div className={styles["drop-shadow"]}></div>
    </div>
  )
}

export default HeroSection;