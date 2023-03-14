import React, { ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Ranking from "./views/Ranking";
import Karma from "./views/Karma";
import "../App.css";
import "./Jam.css";
import Sidebar from "./components/Sidebar";
import Team from "./views/Team";
import Platform from "./views/Platform";
import Genre from "./views/Genre";
import Overview from "./views/Overview";
import { SetJamTheme } from "../components/Color/ColorManager";
import ReactGA from "react-ga4";
import { jamData } from "../model/jamData/jamData";
import { observeStyle } from "../components/Color/ChartColorObserver";
import Tools from "./views/Tools";
import Tags from "./views/Tags";
import JamLoading from "./components/JamLoading";

function Jam(): ReactElement {
  const { jamName } = useParams();
  const [jamData, setJamData] = useState<jamData>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(observeStyle, []);

  if (jamData === undefined) document.title = `Jamalyzer | Loading..`;
  useEffect(() => {
    if (jamName === undefined) return;
    fetch(`/api/jamData?jamName=${jamName}`)
      .then(async (response) => {
        await response.json().then((json: jamData) => {
          if (!json.errors) {
            setJamData(json);
            document.title = `Jamalyzer | ${json.jam.Title}`;
            if (ReactGA.isInitialized)
              ReactGA.send({ hitType: "pageview", page: window.location.pathname });
          } else {
            setErrors(json.errors);
            document.title = `Jamalyzer | Error`;
          }
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [jamName]);

  return (
    <div className="Jam">
      {jamData !== undefined || errors.length > 0 ? (
        <JamAnalysis jamData={jamData} errors={errors} />
      ) : (
        <JamLoading />
      )}
    </div>
  );
}

interface JamAnalysisProps {
  jamData: jamData | undefined;
  errors: string[];
}

function JamAnalysis({ jamData, errors }: JamAnalysisProps): ReactElement {
  if (errors.length > 0)
    return (
      <>
        {errors.map((e, idx) => {
          return <p key={idx}> {e} </p>;
        })}
      </>
    );
  if (jamData === undefined) return <></>;
  if (jamData.jam.secondary_color === undefined || jamData.jam.color === undefined) return <></>;
  SetJamTheme(jamData.jam.color, jamData.jam.secondary_color);

  return (
    <div className="jam-container">
      <Helmet>
        <meta content={jamData.jam.Title} property="og:title" />
        <meta
          content={`Analyze the ${jamData.jam.Title} on Jamalyzer.com! Your go to destination for in depth analysis of game jams!`}
          property="og:description"
        />
        <meta content={jamData.jam.banner} property="og:image" />
        <meta content={jamData.jam.color} data-react-helmet="true" name="theme-color" />
      </Helmet>
      <Sidebar />
      <div className="view-container">
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
