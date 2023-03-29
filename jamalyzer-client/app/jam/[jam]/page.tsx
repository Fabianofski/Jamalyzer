import React, { ReactElement } from "react";
import Ranking from "./views/Ranking";
import Karma from "./views/Karma";
import Sidebar from "./components/Sidebar";
import Team from "./views/Team";
import Platform from "./views/Platform";
import Genre from "./views/Genre";
import Overview from "./views/Overview";
import ReactGA from "react-ga4";
import { jamData } from "@/model/jamData/jamData";
import Tools from "./views/Tools";
import Tags from "./views/Tags";
import JamTheme from "@/app/jam/[jam]/components/JamTheme";
import { setJamTheme } from "@/utilities/Color/ColorManager";
import styles from "@/styles/jam/Jam.module.css";

const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "http://api";

async function Jam({
  params,
}: {
  params: { jam: string };
}): Promise<ReactElement> {
  const jamName = params.jam;

  const response = await fetch(`${host}/api/jamData?jamName=${jamName}`, {
    next: { revalidate: 0 },
  });
  const jamData = await response.json();
  if (!jamData.errors) {
    if (ReactGA.isInitialized)
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
      });
  }

  return (
    <div className={styles.Jam}>
      <JamAnalysis jamData={jamData} errors={jamData.errors} />
    </div>
  );
}

interface JamAnalysisProps {
  jamData: jamData;
  errors: string[];
}

function JamAnalysis({ jamData, errors }: JamAnalysisProps): ReactElement {
  if (errors && errors.length > 0)
    return (
      <>
        {errors.map((e, idx) => {
          return <p key={idx}> {e} </p>;
        })}
      </>
    );
  if (
    jamData.jam.secondary_color === undefined ||
    jamData.jam.color === undefined
  )
    return <></>;
  setJamTheme(jamData.jam.color, jamData.jam.secondary_color);
  return (
    <div className={styles["jam-container"]}>
      <title>{"Jamalyzer | " + jamData.jam.Title}</title>
      <meta content={jamData.jam.Title} property="og:title" />
      <meta
        content={`Analyze the ${jamData.jam.Title} on Jamalyzer.com! Your go to destination for in depth analysis of game jams!`}
        property="og:description"
      />
      <meta content={jamData.jam.banner} property="og:image" />
      <meta
        content={jamData.jam.color}
        data-react-helmet="true"
        name="theme-color"
      />
      <JamTheme jamData={jamData} />

      <Sidebar />
      <div className={styles["view-container"]}>
        <Overview jamData={jamData} />
        <Ranking jamData={jamData} />
        <Karma jamData={jamData} />
        <Team jamData={jamData} />
        <Platform jamData={jamData} />
        <Tools jamData={jamData} />
        <Tags jamData={jamData} />
        <Genre jamData={jamData} />
      </div>
    </div>
  );
}

export default Jam;
