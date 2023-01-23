import React from "react";
import "./View.css";
import {Card} from "../cards/BasicCard";
import {jamData} from "../../model/jamData";

function Engine({jamData}: { jamData: jamData }) {
  return (
    <div className="view" id="Engine">
      <h1>Engine (WIP)</h1>
      <div className="card-grid">
        <Card
          text={"Lorem ipsum dolor sit amet."}
          styleClass={"card card-col-span-6"}
        />
        <Card
          text={"Median: 2 Collaborators"}
          styleClass={"card card-col-span-2"}
        />
        <Card
          text={"Lorem ipsum dolor sit amet."}
          styleClass={"card card-col-span-4 card-row-span-2"}
        />
        <Card
          text={"Most: 5 Collaborators"}
          styleClass={"card card-col-span-2"}
        />
      </div>
    </div>
  );
}

export default Engine;
