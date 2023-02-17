import React, { ReactElement, useState } from "react";
import "../App.css";
import "./Wireframe.css";
import { toggleTheme, getTheme } from "./ColorManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, fa2 } from "@fortawesome/free-solid-svg-icons";

function Nav({}): ReactElement {
  const [darkMode, setDarkMode] = useState(getTheme() === "dark");

  const toggle = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <div className="nav">
      <button>
        <i className={`collapse-button-icon fa fa-2x fa-navicon`}></i>
      </button>
      <a href={"/"} className={"logo"}>
        Jamalyzer
      </a>

      <button onClick={toggle} className={"toggle-theme-btn"}>
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} size={"2x"} />
        ) : (
          <FontAwesomeIcon icon={faMoon} size={"2x"} />
        )}
      </button>
    </div>
  );
}

export default Nav;
