import React, { ReactElement } from "react";
import "../App.css";
import "./Wireframe.css";
import { toggleTheme } from "./ColorManager";

function Nav({}): ReactElement {
  return (
    <div className="nav">
      <button>
        <i className={`collapse-button-icon fa fa-2x fa-navicon`}></i>
      </button>
      <a href={"/"} className={"logo"}>
        Jamalyzer
      </a>

      <button onClick={() => toggleTheme()}>
        <i className={`collapse-button-icon fa fa-2x fa-circle-o-notch`}></i>
      </button>
    </div>
  );
}

export default Nav;
