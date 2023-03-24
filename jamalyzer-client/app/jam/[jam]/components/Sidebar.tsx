"use client";
import React, { ReactElement } from "react";
import ReactGA from "react-ga4";
import styles from "@/styles/jam/components/Sidebar.module.css";

function Sidebar(): ReactElement {
  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.sidebar}>
        <Chapter id={"Overview"} />
        <Chapter id={"Ranking"} />
        <Chapter id={"Karma"} />
        <Chapter id={"Team"} />
        <Chapter id={"Platform"} />
        <Chapter id={"Tools"} />
        <Chapter id={"Tags"} />
        <Chapter id={"Genre"} />
      </div>
    </div>
  );
}

function Chapter({ id }: { id: string }): ReactElement {
  const sendChapterGAEvent = (): void => {
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Chapter",
        action: "Switched Chapter",
        label: id,
      });
  };

  return (
    <a href={`#${id}`} className={styles.chapter} onClick={sendChapterGAEvent}>
      <div>
        <p>{id}</p>
      </div>
    </a>
  );
}

export default Sidebar;
