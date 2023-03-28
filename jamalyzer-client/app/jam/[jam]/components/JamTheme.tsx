"use client";
import React, { useEffect } from "react";
import {
  setJamTheme,
  updateCSSVariables,
} from "@/utilities/Color/ColorManager";
import { observeStyle } from "@/utilities/Color/ChartColorObserver";
import { jamData } from "@/model/jamData/jamData";

function JamTheme({ jamData }: { jamData: jamData }) {
  useEffect(() => {
    observeStyle();
    setJamTheme(jamData.jam.color, jamData.jam.secondary_color);
    updateCSSVariables();
  }, [jamData]);

  return <></>;
}

export default JamTheme;
