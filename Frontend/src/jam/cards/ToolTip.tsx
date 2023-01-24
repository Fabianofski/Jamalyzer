import React, { ReactElement } from "react";
import "./ToolTip.css";

function ToolTip({ jsx }: { jsx: ReactElement }): ReactElement {
  return (
    <div className="tooltip">
      <i className={`tooltip-icon fa fa-info-circle`}>
        <div className="tooltip-text">{jsx}</div>
      </i>
    </div>
  );
}

export default ToolTip;
