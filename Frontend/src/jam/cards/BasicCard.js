import React from "react";
import "../views/View.css";
import "./Card.css";
import ToolTip from "./ToolTip";

export function Card({ text, styleClass, tooltip = null }) {
  return (
    <div className={styleClass} >
      {tooltip !== null ? <ToolTip jsx={tooltip}/> : ""}
      <p>{text}</p>
    </div>
  );
}

export function JsxCard({ jsx, styleClass, tooltip = null }) {
  return (
    <div className={styleClass}>
      {tooltip !== null ? <ToolTip jsx={tooltip}/> : ""}
      {jsx}
    </div>
  );
}
