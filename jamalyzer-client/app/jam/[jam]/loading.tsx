"use client";
import React, { useEffect } from "react";
import { LoadingBarItem } from "@/model/LoadingBarItem";
import { loadingBarItems } from "./LoadingBarItems";
import styles from "@/styles/jam/components/Loader.module.css";
import Image from "next/image";

function Loading() {
  const random = Math.floor(Math.random() * loadingBarItems.length);
  const loadingBarItem: LoadingBarItem = loadingBarItems[random];

  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return (
    <div
      className={styles["jam-loader-wrapper"]}
      style={{ scrollBehavior: "auto" }}
    >
      <div className={styles.jamLoader}>
        <h3 style={{ marginBottom: "1rem" }}>Loading...</h3>
        <div className={styles.loadingImage}>
          <Image
            src={`/assets/loading/${loadingBarItem.image}`}
            alt={"Loading Animation"}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <a href={loadingBarItem.link} target="_blank" rel="noopener noreferrer">
          {loadingBarItem.author}: {loadingBarItem.title}
        </a>
      </div>
    </div>
  );
}

export default Loading;
