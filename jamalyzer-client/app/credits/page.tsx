import React, { ReactElement } from "react";
import styles from "@/styles/legal/Legal.module.css"
import creditsStyles from "@/styles/legal/Credits.module.css";

function Credits(): ReactElement {
  return (
    <div className={styles.legalContainer}>
      <title>Jamalyzer | Credits</title>

      <h1 style={{ color: "var(--text-color)" }}>Credits</h1>
      <div className={styles.legalView}>
        <h1>FABIAN</h1>
        <div className={creditsStyles.creditsWrapper}>
          <img src="/logo.png" alt="F4B1 Logo" className={creditsStyles.profile}></img>
          <div className={creditsStyles.information}>
            <Link
              site={"Itch.io - F4B1"}
              link={"https://f4b1.itch.io"}
              icon={"https://static.itch.io/images/itchio-textless-black.svg"}
            />
            <Link
              site={"GitHub - Fabianofski"}
              link={"https://github.com/Fabianofski"}
              icon={
                "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  site: string;
  link: string;
  icon: string;
}

function Link({ site, link, icon }: Props): ReactElement {
  return (
    <a className={creditsStyles.link} href={link} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={`${site} Icon`} />
      <h2>{site}</h2>
    </a>
  );
}

export default Credits;
