"use client";
import React, { ReactElement, useEffect } from "react";
import ReactGA from "react-ga4";
import styles from "@/styles/jam/components/Sidebar.module.css";

function Sidebar(): ReactElement {
  function checkOffset(
    sidebar: HTMLDivElement | null,
    footer: HTMLDivElement | null
  ) {
    function getRectTop(el: any) {
      let rect = el.getBoundingClientRect();
      return rect.top;
    }

    if (!sidebar || !footer) return;

    if (
      getRectTop(sidebar) + document.body.scrollTop + sidebar.offsetHeight >=
      getRectTop(footer) + document.body.scrollTop - 10
    )
      sidebar.style.position = "absolute";
    if (
      document.body.scrollTop + window.innerHeight <
      getRectTop(footer) + document.body.scrollTop
    )
      sidebar.style.position = "fixed"; // restore when you scroll up
  }

  useEffect(() => {
    const sidebar: HTMLDivElement | null = document.querySelector("#sidebar");
    const footer: HTMLDivElement | null = document.querySelector("#footer");

    document.addEventListener("scroll", function () {
      checkOffset(sidebar, footer);
    });
  }, []);

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.sidebar} id={"sidebar"}>
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
