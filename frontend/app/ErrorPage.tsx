"use client";

import React from "react";
import styles from "@/styles/ErrorPage.module.css";
import buttonStyles from "@/styles/home/HomeJamCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({ error }: { error: string }) {
  return (
    <div className={styles["error-container"]}>
      <div className={styles.container}>
        <Image
          src={"/assets/error/jam-jar.jpg"}
          alt={"shattered jam jar"}
          width={400}
          height={300}
          style={{ objectFit: "contain" }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ margin: "0" }}>Art by:&nbsp;</p>
          <a
            href={"https://www.santumerino.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.credits}
          >
            santumerino
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.message}>{error}</p>
        <Link href={"/"} className={buttonStyles["analyze-button"]}>
          Back
        </Link>
      </div>
    </div>
  );
}
