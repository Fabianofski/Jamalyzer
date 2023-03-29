"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/home/HomeRecommended.module.css";
import jamList from "@/public/jamList.json";
import { jamCard } from "@/model/jamData/jamCard";
import HomeJamCard from "@/app/home/HomeJamCard";

function HomeRecommended({ jams }: { jams: jamCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState<number>(4);

  function getGridColumns() {
    if (!gridRef.current) return;
    const gridComputedStyle = window.getComputedStyle(gridRef.current);
    const gridColumnCount = gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    setColumnCount(gridColumnCount);
  }
  useEffect(() => {
    setInterval(getGridColumns, 200);
  }, []);

  return (
    <div className={styles["home-recommended-section"]}>
      <div className={styles["card-grid"]} ref={gridRef}>
        {jams.slice(0, columnCount * 2).map((jam, index) => {
          return <HomeJamCard jam={jam} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HomeRecommended;
