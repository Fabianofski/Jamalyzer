import React from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch({option, setOption}){
  return(
    <label className="switch">
      <input type="checkbox" onClick={()=>setOption(!option)}/>
      <span className="slider round"></span>
    </label>
  );
}