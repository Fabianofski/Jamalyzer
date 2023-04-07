"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/home/HomeJamCard.module.css";
import { jamCard } from "@/model/jamData/jamCard";
import Image from "next/image";
import ReactGA from "react-ga4";

function HomeJamCard({ jam }: { jam: jamCard }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [targetY, setTargetY] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [num, setNum] = useState(0);

  const tiltCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xCenter = rect.left + rect.width / 2;
    const yCenter = rect.top + rect.height / 2;
    setTargetY(((e.clientX - xCenter) / (rect.width / 2)) * 10);
    setTargetX(((yCenter - e.clientY) / (rect.height / 2)) * 10);
  };

  const resetTilt = () => {
    setTargetY(0);
    setTargetX(0);
  };

  function interpolate() {
    if (!cardRef.current) return;
    setCurrentX(lerp(currentX, targetX));
    setCurrentY(lerp(currentY, targetY));
    cardRef.current.style.setProperty("--rotate-y", currentY + "deg");
    cardRef.current.style.setProperty("--rotate-x", currentX + "deg");
  }

  function lerp(a: number, b: number, speed: number = 30) {
    return Number((a + (b - a) / speed).toFixed(2));
  }

  useEffect(() => {
    if (getPrefersReducedMotion() || window.innerWidth < 1250) return;
    const interval = setInterval(interpolate, 1);
    return () => clearInterval(interval);
  }, [currentX, currentY, targetX, targetY]);

  const onClick = (): void => {
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze recommended jam",
        label: jam.name,
      });
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={(e) => tiltCard(e)}
      onMouseLeave={resetTilt}
    >
      <JamBanner jam={jam} />
      <a href={jam.link} target="_blank" rel="noopener noreferrer">
        <h2>{jam.name.substring(0, 50)}</h2>
      </a>
      <Hosts jam={jam} />
      <div className={styles.stats}>
        <h3> {jam.joined} joined </h3>
        <h3> {jam.submitted} Entries </h3>
      </div>
      <a
        className={styles["analyze-button"]}
        href={`/jam/${jam.link.replace("https://itch.io/jam/", "")}`}
        onClick={onClick}
      >
        ANALYZE
      </a>
    </div>
  );
}

function JamBanner({ jam }: { jam: jamCard }) {
  return (
    <>
      <Image
        className={styles["banner"]}
        src={jam.icon}
        alt={jam.name + " Banner"}
        width={500}
        height={500}
      />
      <div className={styles["drop-shadow"]}></div>
      <div className={styles.background}></div>
      <div className={styles.blur}></div>
    </>
  );
}

function Hosts({ jam }: { jam: jamCard }) {
  return (
    <p>
      {jam.hosts
        .slice(0, 5)
        .map((element, idx) => {
          return (
            <a
              href={element.profile_link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
            >
              {element.name}
            </a>
          );
        })
        .reduce((prev, curr, idx) => (
          <React.Fragment key={idx}>{[prev, ", ", curr]}</React.Fragment>
        ))}
    </p>
  );
}

function getPrefersReducedMotion() {
  const QUERY = "(prefers-reduced-motion: no-preference)";
  const mediaQueryList = window.matchMedia(QUERY);
  return !mediaQueryList.matches;
}

export default HomeJamCard;
