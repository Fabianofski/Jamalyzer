import React from "react";
import styles from "@/styles/home/HomeJamCard.module.css";
import { jamCard } from "@/model/jamData/jamCard";
import Image from "next/image";

function HomeJamCard({ jam }: { jam: jamCard }) {
  return (
    <div className={styles.card}>
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
