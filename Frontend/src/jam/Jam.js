import React, { useState, useEffect } from "react";
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
import {SetJamTheme} from "../components/ColorManager";

function Jam() {
  const { jamName } = useParams();
  const [jamData, setJamData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  if (!dataLoaded) document.title = `Jamalyzer | Loading..`;
  useEffect(() => {
    fetch(`/api/jamData?jamName=${jamName}`)
      .then((response) => response.json())
      .then((json) => {
        if("errors" in json) {
          setErrors(json.errors);
          document.title = `Jamalyzer | Error`;
        }
        else {
          setJamData(json);
          document.title = `Jamalyzer | ${json.jam.Title}`;
        }
        setDataLoaded(true);
      });
  }, [jamName]);
  
  return (
    <div className="Jam">
      {dataLoaded ? <JamAnalysis jamData={jamData} errors={errors}/> : <Loader />}
    </div>
  );
}

function JamAnalysis({ jamData, errors }) {
  if(errors.length > 0)
    return (
      errors.map((e) => {
        return(<p> {e} </p>);
      })
    );
  
  if (!jamData.jam.secondary_color || !jamData.jam.color) return;
  SetJamTheme(jamData.jam.color, jamData.jam.secondary_color);
  
  return (
    <div className="jam-container">
      <Sidebar />
      <div className="view-container">
        <Overview jamData={jamData}/>
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

function Loader() {
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
        xmlSpace="preserve"
      >
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
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
