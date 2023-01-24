import React, { ReactElement } from "react";
import "../views/View.css";
import "./Card.css";
import ToolTip from "./ToolTip";

interface CardProps {
  text: string;
  styleClass: string;
  tooltip?: ReactElement | null;
}

export function Card({ text, styleClass, tooltip = null }: CardProps): ReactElement {
  return (
    <div className={styleClass}>
      {tooltip !== null ? <ToolTip jsx={tooltip} /> : ""}
      <p>{text}</p>
    </div>
  );
}

interface JsxCardProps {
  jsx: ReactElement;
  styleClass: string;
  tooltip?: ReactElement | null;
}

export function JsxCard({ jsx, styleClass, tooltip = null }: JsxCardProps): ReactElement {
  return (
    <div className={styleClass}>
      {tooltip !== null ? <ToolTip jsx={tooltip} /> : ""}
      {jsx}
    </div>
  );
}
