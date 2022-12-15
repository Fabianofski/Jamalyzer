import React from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch({setOption}){
  return(
    <label className="switch">
      <input type="checkbox" onClick={setOption(this)} defaultChecked/>
      <span className="slider round"></span>
    </label>
  );
}