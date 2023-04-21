"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/home/HeroSection.module.css";
import Image from "next/image";
import HomeForm from "@/app/home/HomeForm";
import { getPrefersReducedMotion } from "@/utilities/Accessibility";

function HeroSection() {
  return (
    <div className={styles["hero-section"]}>
      <Background />
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
    </div>
  );
}

function Background() {
  return (
    <div className={styles.backgrounds}>
      <BackgroundImage name={"0"} parallaxAmount={0} />
      <BackgroundImage name={"1"} parallaxAmount={0.1} />
      <BackgroundImage name={"2"} parallaxAmount={0.15} />
      <BackgroundImage name={"3"} parallaxAmount={0.2} />
      <BackgroundImage name={"4"} parallaxAmount={0.6} />
      <div className={styles["drop-shadow"]}></div>
    </div>
  );
}

function BackgroundImage({
  name,
  parallaxAmount,
}: {
  name: string;
  parallaxAmount: number;
}) {
  const [currentOffset, setCurrentOffset] = useState(0);

  const scrollHandler = () => {
    setCurrentOffset((-window.scrollY * parallaxAmount) / 2);
  };

  useEffect(() => {
    if (getPrefersReducedMotion()) return;
    window.addEventListener("scroll", scrollHandler);
  }, [currentOffset]);

  return (
    <Image
      src={`/assets/hero/${name}.png`}
      alt={`hero banner ${name}`}
      width={1500}
      height={1500}
      className={styles["hero-banner"]}
      style={{ transform: `translateY(${currentOffset}px)`, top: "0" }}
    />
  );
}

export default HeroSection;
