import React, { ReactElement } from "react";
import styles from "../../styles/cookies/ToggleSwitch.module.css";

interface Props {
  option: boolean;
  setOption: React.Dispatch<boolean>;
}

export default function ToggleSwitch({
  option,
  setOption,
}: Props): ReactElement {
  return (
    <div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onClick={() => {
            setOption(!option);
          }}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
