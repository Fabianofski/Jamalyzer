import React from "react";
import "../../App.css";
import "./Sidebar.css";

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

function Chapter({ id }) {
  return (
    <a href={`#${id}`} className="chapter">
      <div>
        <p>{id}</p>
      </div>
    </a>
  );
}

export default Sidebar;
