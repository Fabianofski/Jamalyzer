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
import { getJamPrimary, setJamTheme } from "@/utilities/Color/ColorManager";
import styles from "@/styles/jam/Jam.module.css";
import GMTKDisclaimer from "@/app/jam/[jam]/components/GMTKDisclaimer";
import ErrorPage from "@/app/ErrorPage";

const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://jamalyzer.com";

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

  if (jamData.errors) return <ErrorPage error={jamData.errors[0]} />;

  if (ReactGA.isInitialized)
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });

  return (
    <>
      {jamName === "gmtk-2020" ? <GMTKDisclaimer /> : <></>}
      <div className={styles.Jam}>
        <JamAnalysis jamData={jamData} />
      </div>
    </>
  );
}

interface JamAnalysisProps {
  jamData: jamData;
}

function JamAnalysis({ jamData }: JamAnalysisProps): ReactElement {
  if (
    jamData.jam.secondary_color === undefined ||
    jamData.jam.color === undefined
  )
    return <></>;
  setJamTheme(jamData.jam.color, jamData.jam.secondary_color);
  return (
    <div className={styles["jam-container"]}>
      <title>{"Jamalyzer | " + jamData.jam.Title}</title>
      <meta content={"Jamalyzed: " + jamData.jam.Title} property="og:title" />
      <meta
        content={`Analyze the ${jamData.jam.Title} on Jamalyzer.com! Your go to destination for in depth analysis of game jams!`}
        property="og:description"
      />
      <meta
        content={`Analyze the ${jamData.jam.Title} on Jamalyzer.com! Your go to destination for in depth analysis of game jams!`}
        name="description"
      />
      <meta content={jamData.jam.icon} property="og:image" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        content={getJamPrimary()}
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
