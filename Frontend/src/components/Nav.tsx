import React, { ReactElement } from "react";
import "../App.css";

function Nav({
  darkMode,
  setDarkMode
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<boolean>;
}): ReactElement {
  return (
    <div className="nav">
      <a href={"/"} className={"logo"}>
        Jamalyzer
      </a>
      <button onClick={() => setDarkMode(!darkMode)} />
    </div>
  );
}

export default Nav;
