import React, { ReactElement } from "react";
import "./ToggleSwitch.css";

interface Props {
  option: boolean;
  setOption: React.Dispatch<boolean>;
}

export default function ToggleSwitch({ option, setOption }: Props): ReactElement {
  return (
    <div className={"switch-container"}>
      <label className="switch">
        <input
          type="checkbox"
          onClick={() => {
            setOption(!option);
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
