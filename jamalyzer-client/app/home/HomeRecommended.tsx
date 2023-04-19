"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/home/HomeRecommended.module.css";
import jamList from "@/public/jamList.json";
import { jamCard } from "@/model/jamData/jamCard";
import HomeJamCard from "@/app/home/HomeJamCard";
import { ResetToDefaultColors } from "@/utilities/Color/ColorManager";

function shuffle(array: jamCard[]): jamCard[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function HomeRecommended() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState<number>(4);
  const [jams, setJams] = useState<jamCard[]>();

  useEffect(ResetToDefaultColors, []);

  function getGridColumns() {
    if (!gridRef.current) return;
    const gridComputedStyle = window.getComputedStyle(gridRef.current);
    const gridColumnCount = gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    setColumnCount(gridColumnCount);
  }
  useEffect(() => {
    setJams(shuffle(jamList.jams));
    setInterval(getGridColumns, 200);
  }, []);

  return (
    <div className={styles["home-recommended-section"]}>
      <div className={styles["card-grid"]} ref={gridRef}>
        {(jams || jamList.jams).slice(0, columnCount * 2).map((jam, index) => {
          return <HomeJamCard jam={jam} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HomeRecommended;
