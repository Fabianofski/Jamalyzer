"use client";
import React from "react";
import styles from "@/styles/home/HeroSection.module.css";
import Image from "next/image";
import HomeForm from "@/app/home/HomeForm";

function HeroSection() {
  return (
    <div className={styles["hero-section"]}>
      <div className={styles["caption-container"]}>
        <h1 className={styles.caption}>
          ANALYZE YOUR <br />
          FAVOURITE GAME JAMS!
        </h1>
        <h1 className={styles["caption-gradient"]}>
          ANALYZE YOUR <br />
          FAVOURITE GAME JAMS!
        </h1>
      </div>
      <HomeForm />
      <Image
        src={"/hero-banner.png"}
        alt={"hero-banner"}
        width={4000}
        height={4000}
        className={styles["hero-banner"]}
      />
      <div className={styles["drop-shadow"]}></div>
    </div>
  );
}

export default HeroSection;
