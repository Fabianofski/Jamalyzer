import React from "react";
import "../View.css";

export function Card({ text, styleClass }) {
  return (
    <div className={styleClass}>
      <p>{text}</p>
    </div>
  );
}

export function JsxCard({ jsx, styleClass }) {
  return (
    <div className={styleClass}>
      {jsx}
    </div>
  );
}
