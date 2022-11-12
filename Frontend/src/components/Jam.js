import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ranking from "./views/Ranking";
import Karma from "./views/Karma";
import "./App.css";
import Sidebar from "./Sidebar";
import Team from "./views/Team";
import Platform from "./views/Platform";
import Description from "./views/Description";
import Genre from "./views/Genre";
import Engine from "./views/Engine";

function Jam() {
  const { id } = useParams();
  const [jamData, setJamData] = useState([]);
  const [dataLoaded, setdataLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/jamData?jamid=${id}`)
      .then((response) => response.json())
      .then((json) => {
        setJamData(json);
        setdataLoaded(true);
      });
  }, [id]);

  return (
    <div className="App">
      {dataLoaded ? <JamAnalysis jamData={jamData} /> : <div>Loading..</div>}
    </div>
  );
}

function JamAnalysis({ jamData }) {
  return (
    <div className="jam-container">
      <Sidebar />
      <div className="view-container">
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

export default Jam;
