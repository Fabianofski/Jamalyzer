import React from "react";
import "../../App.css";
import "./Sidebar.css";
import ReactGA from "react-ga4";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Chapter id={"Overview"} />
        <Chapter id={"Ranking"} />
        <Chapter id={"Karma"} />
        <Chapter id={"Team"} />
        <Chapter id={"Platform"} />
        <Chapter id={"Description"} />
        <Chapter id={"Genre"} />
        <Chapter id={"Engine"} />
      </div>
    </div>
  );
}

function Chapter({ id }:{id:string}) {
  
  const sendChapterGAEvent = () => {
    if(ReactGA.isInitialized)
      ReactGA.event({
        category: "Chapter",
        action: "Switched Chapter",
        label: id,
      })
  }
  
  return (
    <a href={`#${id}`} className="chapter" onClick={sendChapterGAEvent}>
      <div>
        <p>{id}</p>
      </div>
    </a>
  );
}

export default Sidebar;
