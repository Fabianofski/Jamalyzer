import React from "react";
import "./ToggleSwitch.css";

type Props = {
  option: boolean,
  setOption: React.Dispatch<boolean>,
}

export default function ToggleSwitch({option, setOption}: Props) {
  return (
    <div className={"switch-container"}>
      <label className="switch">
        <input type="checkbox" onClick={() => setOption(!option)}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
}