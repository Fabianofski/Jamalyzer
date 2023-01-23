import React, { ReactElement } from "react";
import "../App.css";

function Nav(): ReactElement {
  return (
    <div className="nav">
      <a href={"/"} className={"logo"}>
        Jamalyzer
      </a>
    </div>
  );
}

export default Nav;
