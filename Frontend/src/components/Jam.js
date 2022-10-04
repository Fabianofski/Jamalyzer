import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ranking from "./views/Ranking";
import Karma from "./views/Karma";
import "./App.css";

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
      {dataLoaded ? (
        <div className="view-container">
          <Ranking jamData={jamData} />
          <Karma jamData={jamData} />
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}

export default Jam;
