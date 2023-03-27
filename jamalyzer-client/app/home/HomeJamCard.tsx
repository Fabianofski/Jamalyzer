"use client";
import React, { useRef, useState } from "react";
import styles from "@/styles/home/HomeJamCard.module.css";
import { jamCard } from "@/model/jamData/jamCard";
import Image from "next/image";

function HomeJamCard({ jam }: { jam: jamCard }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xCenter = rect.left + rect.width / 2;
    const yCenter = rect.top + rect.height / 2;
    const yRotation = ((e.clientX - xCenter) / (rect.width / 2)) * 10;
    const xRotation = ((yCenter - e.clientY) / (rect.height / 2)) * 10;

    cardRef.current.style.setProperty("--rotate-y", yRotation + "deg");
    cardRef.current.style.setProperty("--rotate-x", xRotation + "deg");
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotate-y", "0");
    cardRef.current.style.setProperty("--rotate-x", "0");
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
      <button className={styles["analyze-button"]}>ANALYZE</button>
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
