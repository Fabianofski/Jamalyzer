import React, { ReactElement } from "react";
import "../../App.css";
import "./Sidebar.css";
import ReactGA from "react-ga4";

function Sidebar(): ReactElement {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Chapter id={"Overview"} />
        <Chapter id={"Ranking"} />
        <Chapter id={"Karma"} />
        <Chapter id={"Team"} />
        <Chapter id={"Platform"} />
        <Chapter id={"Tools"} />
        <Chapter id={"Description"} />
        <Chapter id={"Genre"} />
      </div>
    </div>
  );
}

function Chapter({ id }: { id: string }): ReactElement {
  const sendChapterGAEvent = (): void => {
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Chapter",
        action: "Switched Chapter",
        label: id
      });
  };

  return (
    <a href={`#${id}`} className="chapter" onClick={sendChapterGAEvent}>
      <div>
        <p>{id}</p>
      </div>
    </a>
  );
}

export default Sidebar;
