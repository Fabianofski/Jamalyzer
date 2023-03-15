import React from "react";
import "./Loader.css";
import { LoadingBarItem } from "../../model/LoadingBarItem";
import { loadingBarItems } from "./LoadingBarItems";

function JamLoading() {
  const random = Math.floor(Math.random() * loadingBarItems.length);
  const loadingBarItem: LoadingBarItem = loadingBarItems[random];

  return (
    <div className={"jamLoader"}>
      <h3 style={{ marginBottom: "1rem" }}>Loading...</h3>
      <img src={`/assets/${loadingBarItem.image}`} alt={"Loading Animation"} />
      <a href={loadingBarItem.link} target="_blank" rel="noopener noreferrer">
        {loadingBarItem.author}: {loadingBarItem.title}
      </a>
    </div>
  );
}

export default JamLoading;