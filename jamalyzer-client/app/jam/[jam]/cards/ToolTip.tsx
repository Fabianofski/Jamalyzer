import React, { ReactElement } from "react";
import styles from "@/styles/jam/cards/ToolTip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function ToolTip({ jsx }: { jsx: ReactElement }): ReactElement {
  return (
    <div className={styles.tooltip}>
      <FontAwesomeIcon
        icon={faInfoCircle}
        className={styles.tooltipIcon}
      />
      <div className={styles.tooltipText}>{jsx}</div>
    </div>
  );
}

export default ToolTip;
