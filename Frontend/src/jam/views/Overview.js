import React from "react";
import "./View.css";
import {Card, JsxCard} from "../cards/BasicCard.js";
import {format, parseISO, differenceInHours, intervalToDuration, formatDuration} from "date-fns";

function JamHosts(jamData){
  return(
    <div>
      Hosted by:&nbsp;
      {jamData.jam.hosts.map((element, index) =>
        (<a href={element.profile_link} key={index}>{element.username}</a>)
      ).reduce((prev, curr) => [prev, ', ', curr])}
    </div>
  );
}

function JamDate(jamData){
  const timePeriod = differenceInHours(parseISO(jamData.jam.ended), parseISO(jamData.jam.started));
  const endPeriod = differenceInHours(parseISO(jamData.jam.ended), new Date());
  const timePeriodDuration = intervalToDuration({ start: 0, end: timePeriod * 60 * 60 * 1000 })
  const endPeriodDuration = intervalToDuration({ start: 0, end: endPeriod * 60 * 60 * 1000 })
  return (
    <div>
        {format(parseISO(jamData.jam.started), 'dd.MM.yyyy')}-
        {format(parseISO(jamData.jam.ended), 'dd.MM.yyyy')} <br />
        This Jam ran for {formatDuration(timePeriodDuration)} <br />
        Ended {formatDuration(endPeriodDuration)} ago
    </div>
  );
}

function JamStats(jamData){
  return (
    <div>
      {jamData.jam.ratings + " Ratings"} <br />
      {jamData.jam.entries + " Entries"}
    </div>
  );
}

function Overview({jamData}) {
  return (
    <div className="view" id="Overview" style={{backgroundColor: `${jamData.jam.bg_color}`}}>
      <h1 className="jam-title">
        <a href={jamData.jam.url} target="_blank" rel="noopener noreferrer" className="jam-title-link">{jamData.jam.Title} </a>
      </h1>
      <img className="jam-banner" src={jamData.jam.banner} alt="Game Jam Banner"/>
      <div className="card-grid">
        <JsxCard
          jsx={JamHosts(jamData)}
          styleClass={"card card-col-span-2"}
        />
        <JsxCard
          jsx={JamDate(jamData)}
          styleClass={"card card-col-span-2"}
        />
        <JsxCard
          jsx={JamStats(jamData)}
          styleClass={"card card-col-span-1 card-row-span-1"}
        />
        <Card
          text={<a href={jamData.jam.twitter.twitter_link} target="_blank" rel="noopener noreferrer">{jamData.jam.twitter.hashtag}</a>}
          styleClass={"card card-col-span-1"}
        />
      </div>
    </div>
  );
}

export default Overview;
