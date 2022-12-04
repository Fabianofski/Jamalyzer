import React from "react";
import "./View.css";
import {Card, JsxCard} from "./Cards/BasicCard.js";

function Hosts(jamData){
  return(
    <div>
      Hosted by:&nbsp;
      {jamData.jam.hosts.map((element, index) =>
        (<a href={element.profile_link} key={index}>{element.username}</a>)
      ).reduce((prev, curr) => [prev, ', ', curr])}
    </div>
  );
}

function Overview({jamData}) {
  return (
    <div className="view" id="Overview">
      <h1><a href={jamData.jam.url} target="_blank" rel="noopener noreferrer">{jamData.jam.Title}</a></h1>
      <div className="card-grid">
        <JsxCard
          jsx={Hosts(jamData)}
          styleClass={"card card-col-span-2"}
        />
        <Card
          text={<a href={jamData.jam.twitter.twitter_link} target="_blank" rel="noopener noreferrer">{jamData.jam.twitter.hashtag}</a>}
          styleClass={"card card-col-span-1"}
        />
        <Card
          text={jamData.jam.entries + " Entries"}
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
