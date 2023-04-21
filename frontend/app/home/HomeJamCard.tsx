"use client";
import React, { useRef } from "react";
import styles from "@/styles/home/HomeJamCard.module.css";
import { jamCard } from "@/model/jamData/jamCard";
import Image from "next/image";
import ReactGA from "react-ga4";
import Link from "next/link";
import { getPrefersReducedMotion } from "@/utilities/Accessibility";

function HomeJamCard({ jam }: { jam: jamCard }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (getPrefersReducedMotion() || window.innerWidth < 800) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xCenter = rect.left + rect.width / 2;
    const yCenter = rect.top + rect.height / 2;

    const x = (((yCenter - e.clientY) / (rect.height / 2)) * 10);
    const y = (((e.clientX - xCenter) / (rect.width / 2)) * 10);

    cardRef.current.style.setProperty("--rotate-x", x + "deg");
    cardRef.current.style.setProperty("--rotate-y", y + "deg");
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotate-x", "0");
    cardRef.current.style.setProperty("--rotate-y", "0");
  };

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
      <Link
        className={styles["analyze-button"]}
        href={`/jam/${jam.link.replace("https://itch.io/jam/", "")}`}
        onClick={onClick}
      >
        ANALYZE
      </Link>
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



export default HomeJamCard;
