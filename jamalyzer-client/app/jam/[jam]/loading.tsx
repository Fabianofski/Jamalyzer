import React from "react";
import { LoadingBarItem } from "@/model/LoadingBarItem";
import { loadingBarItems } from "./LoadingBarItems";
import styles from "@/styles/jam/components/Loader.module.css";

function Loading() {
  const random = Math.floor(Math.random() * loadingBarItems.length);
  const loadingBarItem: LoadingBarItem = loadingBarItems[random];

  return (
    <div className={styles.jamLoader}>
      <h3 style={{ marginBottom: "1rem" }}>Loading...</h3>
      <img src={`/assets/${loadingBarItem.image}`} alt={"Loading Animation"} />
      <a href={loadingBarItem.link} target="_blank" rel="noopener noreferrer">
        {loadingBarItem.author}: {loadingBarItem.title}
      </a>
    </div>
  );
}

export default Loading;
