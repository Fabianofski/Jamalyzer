"use client";
import React, { useRef } from "react";
import styles from "@/styles/jam/components/GMTKDisclaimer.module.css";

function GMTKDisclaimer() {
  const disclaimerRef = useRef<HTMLDivElement>(null);

  const closePanel = () => {
    disclaimerRef.current?.remove();
  };

  return (
    <div className={styles.container} ref={disclaimerRef}>
      <div className={styles.banner}>
        <h1>WE&apos;RE SORRY</h1>

        <p>
          Unfortunately, the data for this jam is corrupted as the itch.io API
          only provides the 20 &quot;TOP MARKS&quot; games when requesting the
          results.
        </p>
        <p>
          The{" "}
          <a
            href={"https://itch.io/jam/11065/entries.json"}
            target="_blank"
            rel="noopener noreferrer"
          >
            entries.json
          </a>{" "}
          file linked here is functional, but the{" "}
          <a
            href={"https://itch.io/jam/11065/results.json"}
            target="_blank"
            rel="noopener noreferrer"
          >
            results.json
          </a>
          &nbsp;is broken. It&apos;s still possible to view the jam&apos;s data,
          but please be aware that some charts may not work, and the data is
          incomplete.
        </p>

        <button onClick={closePanel}> ACCEPT </button>
      </div>
    </div>
  );
}

export default GMTKDisclaimer;
