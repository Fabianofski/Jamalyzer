import React, { ReactElement } from "react";
import "./View.css";
import { JsxCard } from "../cards/BasicCard";
import { differenceInHours, format, formatDuration, intervalToDuration, parseISO } from "date-fns";
import { jamData } from "../../model/jamData/jamData";
import { jam } from "../../model/jamData/jam";
import { GetJamPrimary } from "../../components/Color/ColorManager";
import { hslToRGB, rgbToHSL } from "../../components/Color/ColorConverter";

function JamHosts(jamData: jamData): ReactElement {
  return (
    <div>
      Hosted by:&nbsp;
      {jamData.jam.hosts
        .map((element, index) => (
          <a href={element.profile_link} key={index}>
            {element.username}
          </a>
        ))
        .reduce((prev, curr) => (
          <>{[prev, ", ", curr]}</>
        ))}
    </div>
  );
}

function JamDate(jam: jam): ReactElement {
  const timePeriod = differenceInHours(parseISO(jam.ended), parseISO(jam.started));
  const endPeriod = differenceInHours(parseISO(jam.ended), new Date());
  const timePeriodDuration = intervalToDuration({ start: 0, end: timePeriod * 60 * 60 * 1000 });
  const endPeriodDuration = intervalToDuration({ start: 0, end: endPeriod * 60 * 60 * 1000 });
  return (
    <div>
      This Jam ran from{" "}
      <strong>
        {format(parseISO(jam.started), "dd.MM.yyyy")} to {format(parseISO(jam.ended), "dd.MM.yyyy")}
        ,
      </strong>
      <br />
      ended <strong> {formatDuration(endPeriodDuration)} </strong> ago, <br />
      and ran for <strong> {formatDuration(timePeriodDuration)} </strong>
    </div>
  );
}

function JamStats(jam: jam): ReactElement {
  return (
    <div>
      <strong>{jam.ratings}</strong> Ratings
      <br />
      <strong>{jam.entries}</strong> Entries
    </div>
  );
}

function Overview({ jamData }: { jamData: jamData }): ReactElement {
  return (
    <div className="view" id="Overview" style={{ backgroundColor: `${jamData.jam.bg_color}` }}>
      <h1 className="jam-title">
        <a
          href={jamData.jam.url}
          target="_blank"
          rel="noopener noreferrer"
          className="jam-title-link">
          {jamData.jam.Title}
        </a>
      </h1>
      <img className="jam-banner" src={jamData.jam.banner} alt="Game Jam Banner" />
      <div className="card-grid">
        <JsxCard jsx={JamHosts(jamData)} styleClass={"card card-col-span-2"} />
        <JsxCard jsx={JamDate(jamData.jam)} styleClass={"card card-col-span-2"} />
        <JsxCard jsx={JamStats(jamData.jam)} styleClass={"card card-col-span-1 card-row-span-1"} />
        <JsxCard
          jsx={
            <a href={jamData.jam.twitter.twitter_link} target="_blank" rel="noopener noreferrer">
              {jamData.jam.twitter.hashtag}
            </a>
          }
          styleClass={"card card-col-span-1"}
        />
      </div>
    </div>
  );
}

export default Overview;
