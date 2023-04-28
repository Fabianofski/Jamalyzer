import React, { ReactElement } from "react";
import styles from "@/styles/legal/Legal.module.css";
import creditsStyles from "@/styles/legal/Credits.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jamalyzer | Credits",
  description: `Learn about the team behind Jamalyzer and check out 
                their online profiles.`,
};

function Credits(): ReactElement {
  return (
    <div className={styles.legalContainer} style={{ marginBottom: "5rem" }}>
      <h1>Credits</h1>

      <div className={styles.legalView}>
        <h1>FABIAN</h1>
        <div className={creditsStyles.creditsWrapper}>
          <img
            src="/assets/credits/f4b1-logo.png"
            alt="F4B1 Logo"
            className={creditsStyles.profile}
          ></img>
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

      <div className={styles.legalView}>
        <h1>SANTUMERINO</h1>
        <div className={creditsStyles.creditsWrapper}>
          <img
            src="/assets/credits/santum-logo.png"
            alt="Santum Logo"
            className={creditsStyles.profile}
          ></img>
          <div className={creditsStyles.information}>
            <Link
              site={"Itch.io - Santumerino"}
              link={"https://santumerino.itch.io"}
              icon={"https://static.itch.io/images/itchio-textless-black.svg"}
            />
            <a
              className={creditsStyles.link}
              href={"https://www.santumerino.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>santumerino.com</h2>
            </a>
          </div>
        </div>
        <h3 style={{ padding: "1rem 0 0 0", margin: "0" }}>
          Thanks for the amazing banner art!
        </h3>
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
    <a
      className={creditsStyles.link}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={icon} alt={`${site} Icon`} className={creditsStyles.icon} />
      <h2>{site}</h2>
    </a>
  );
}

export default Credits;
