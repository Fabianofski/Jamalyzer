import React from "react";
import styles from "@/styles/home/HomeRecommended.module.css";
import jamList from "@/public/jamList.json";
import { jamCard } from "@/model/jamData/jamCard";

// function shuffle(array: jamCard[]): jamCard[] {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

const jams = jamList.jams;

function HomeRecommended() {

  return (
    <div className={styles["home-recommended-section"]}>
      <div className={styles["card-grid"]}>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
      </div>
    </div>
  );
}

export default HomeRecommended;