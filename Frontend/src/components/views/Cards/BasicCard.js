import React from "react";
import "../View.css";

export function Card({ text, styleClass }) {
  return (
    <div className={styleClass}>
      <p>{text}</p>
    </div>
  );
}
