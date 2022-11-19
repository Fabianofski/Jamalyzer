import React from "react";
import "./View.css";
import {Card} from "./Cards/BasicCard.js";

function Overview({jamData}) {
  let hosts = "";
  jamData.jam.hosts.forEach((host) => hosts+= " " + host.username);
  return (
    <div className="view" id="Engine">
      <h1><a href={jamData.jam.url}>{jamData.jam.Title}</a></h1>
      <div className="card-grid">
        <Card
          text={"Hosted by:" + hosts}
          styleClass={"card card-col-span-2"}
        />
        <Card
          text={jamData.jam.twitter.hashtag}
          styleClass={"card card-col-span-1"}
        />
        <Card
          text={"Entries: " + jamData.jam.entries}
          styleClass={"card card-col-span-1 card-row-span-1"}
        />
        <Card
          text={jamData.jam.ratings + " Ratings"}
          styleClass={"card card-col-span-1 card-row-span-1"}
        />
      </div>
    </div>
  );
}

export default Overview;
