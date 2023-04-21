/*
Dark Theme Switcher:
Copyright (c) 2023 by Amit (https://codepen.io/ghaste/pen/WNOjQJN)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { getTheme, setPreferredColorScheme, toggleTheme } from "@/utilities/Color/ColorManager";
import styles from "../../styles/wireframe/Nav.module.css";
import themeStyle from "../../styles/wireframe/ThemeSwitch.module.css";
import Link from "next/link";
import Hamburger from "@/app/wireframe/Hamburger";

function Nav({}): ReactElement {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setPreferredColorScheme();
    setDarkMode(getTheme() === "dark");
  }, [setDarkMode]);

  const toggle = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${styles.nav} ${themeStyle.nav} ${
        darkMode ? themeStyle.darkTheme : themeStyle.lightTheme
      }`}
    >
      <div className={styles.wrapper}>
        <Hamburger />

        <Link href={"/"} className={styles.logo}>
          Jamalyzer
        </Link>

        <button
          id={themeStyle.switchTheme}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          onClick={toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 472.39 472.39"
          >
            <g className={themeStyle.toggleSun}>
              <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
            </g>
            <g className={themeStyle.toggleCircle}>
              <circle className="cls-1" cx="236.2" cy="236.2" r="103.78" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Nav;
