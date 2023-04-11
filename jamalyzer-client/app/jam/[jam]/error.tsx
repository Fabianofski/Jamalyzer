"use client";

import React from "react";
import styles from "@/styles/jam/error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className={styles["error-container"]}>
      <h1>OOPS!</h1>
      <p className={styles.message}>{error.message}</p>
      <a href={"/"}>Try a different Jam...</a>
    </div>
  );
}
