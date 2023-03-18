"use client"
import React, { useEffect } from "react";
import { SetJamTheme } from "@/utilities/Color/ColorManager";
import { observeStyle } from "@/utilities/Color/ChartColorObserver";
import { jamData } from "@/model/jamData/jamData";


function JamTheme ({jamData} : {jamData: jamData}) {
  useEffect(() => {
    observeStyle();
    SetJamTheme(jamData.jam.color, jamData.jam.secondary_color);
  }, []);

  return (<></>);
}

export default JamTheme;