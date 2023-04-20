import React, { useEffect } from "react";

let textColor = "";
let darkerBackgroundColor = "";

export function observeStyle() {
  const styleObserver = new MutationObserver(() => {
    const style = getComputedStyle(document.documentElement);
    const currentTextColor = style.getPropertyValue("--text-color");
    const currentDarkerBackgroundColor = style.getPropertyValue("--darker-background-color");

    if (currentTextColor !== textColor) {
      const colorChangedEvent = new CustomEvent("textColorChanged", { detail: currentTextColor });
      document.dispatchEvent(colorChangedEvent);
    }

    if (currentDarkerBackgroundColor !== darkerBackgroundColor) {
      const colorChangedEvent = new CustomEvent("darkerBackgroundColorChanged", {
        detail: currentDarkerBackgroundColor
      });
      document.dispatchEvent(colorChangedEvent);
    }
  });

  styleObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"]
  });
}

export function updateStyle(
  setTextColor: React.Dispatch<string>,
  setDarkerBackgroundColor: React.Dispatch<string>
) {
  useEffect(() => {
    document.addEventListener("textColorChanged", (e: any) => setTextColor(e.detail));
    document.addEventListener("darkerBackgroundColorChanged", (e: any) =>
      setDarkerBackgroundColor(e.detail)
    );
  }, []);
}
