import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ranking from "./components/views/Ranking";
import Karma from "./components/views/Karma";
import "./components/App.css";
import Sidebar from "./components/Sidebar";
import Team from "./components/views/Team";
import Platform from "./components/views/Platform";
import Description from "./components/views/Description";
import Genre from "./components/views/Genre";
import Engine from "./components/views/Engine";
import Overview from "./components/views/Overview";

function Jam() {
  const { jamName } = useParams();
  const [jamData, setJamData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/jamData?jamName=${jamName}`)
      .then((response) => response.json())
      .then((json) => {
        setJamData(json);
        setDataLoaded(true);
      });
  }, [jamName]);

  return (
    <div className="App">
      {dataLoaded ? <JamAnalysis jamData={jamData} /> : <Loader />}
    </div>
  );
}

function JamAnalysis({ jamData }) {
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
