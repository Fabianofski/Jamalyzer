import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ranking from "./views/Ranking";
import Karma from "./views/Karma";
import "../App.css";
import "./Jam.css";
import Sidebar from "./components/Sidebar";
import Team from "./views/Team";
import Platform from "./views/Platform";
import Description from "./views/Description";
import Genre from "./views/Genre";
import Engine from "./views/Engine";
import Overview from "./views/Overview";
import { SetJamTheme } from "../components/ColorManager";
import ReactGA from "react-ga4";
import { jamData } from "../model/jamData/jamData";

function Jam(): ReactElement {
  const { jamName } = useParams();
  const [jamData, setJamData] = useState<jamData>();
  const [errors, setErrors] = useState<string[]>([]);

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
        <Loader />
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
      <Sidebar />
      <div className="view-container">
        <Overview jamData={jamData} />
        <Ranking jamData={jamData} />
        <Karma jamData={jamData} />
        <Team jamData={jamData} />
        <Platform jamData={jamData} />
        <Description jamData={jamData} />
        <Genre jamData={jamData} />
        <Engine jamData={jamData} />
      </div>
    </div>
  );
}

function Loader(): ReactElement {
  return (
    <div className="loader loader--style2" title="1">
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="50px"
        height="50px"
        viewBox="0 0 50 50"
        xmlSpace="preserve">
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <p>Loading...</p>
    </div>
  );
}

export default Jam;
