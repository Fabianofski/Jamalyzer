import React from "react";
import "./View.css";
import {Card} from "./Cards/BasicCard.js";

function Hosts(jamData){
  return(
    <div>
      Hosted by:
      {jamData.jam.hosts.map((element) => {
        return(
          <p>
            <a href={element.profile_link}>{element.username}</a>
          </p>)
      })}
    </div>
  );
}

function Overview({jamData}) {
  return (
    <div className="view" id="Engine">
      <h1><a href={jamData.jam.url}>{jamData.jam.Title}</a></h1>
      <div className="card-grid">
        <Card
          text={Hosts(jamData)}
          styleClass={"card card-col-span-1 card-row-span-2"}
        />
        <Card
          text={<a href={jamData.jam.twitter.twitter_link}>{jamData.jam.twitter.hashtag}</a>}
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
