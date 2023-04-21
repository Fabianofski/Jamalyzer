"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/wireframe/Hamburger.module.css";
import { usePathname } from "next/navigation";

function Hamburger() {
  const [active, setActive] = useState(false);
  const [onJamPage, setOnJamPage] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setOnJamPage(pathname.includes("/jam/"));
  }, [pathname]);

  return (
    <div
      className={styles["hamburger-wrapper"]}
      style={onJamPage ? {} : { visibility: "hidden" }}
    >
      <div
        className={`${styles.hamburger} ${active ? styles.open : ""}`}
        onClick={() => setActive(!active)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${styles.list} ${active ? styles.open : styles.closed}`}>
        <ListItem name={"Overview"} setActive={setActive} />
        <ListItem name={"Ranking"} setActive={setActive} />
        <ListItem name={"Karma"} setActive={setActive} />
        <ListItem name={"Team"} setActive={setActive} />
        <ListItem name={"Platform"} setActive={setActive} />
        <ListItem name={"Tools"} setActive={setActive} />
        <ListItem name={"Tags"} setActive={setActive} />
        <ListItem name={"Genre"} setActive={setActive} />
      </div>
    </div>
  );
}

function ListItem({
  name,
  setActive,
}: {
  name: string;
  setActive: React.Dispatch<boolean>;
}) {
  return (
    <a
      href={`#${name}`}
      className={styles.chapter}
      onClick={() => setActive(false)}
    >
      {name}
    </a>
  );
}

export default Hamburger;
