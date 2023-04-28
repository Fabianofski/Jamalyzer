import React, { ReactElement } from "react";
import styles from "../../styles/cookies/ToggleSwitch.module.css";

interface Props {
  option: boolean;
  setOption: React.Dispatch<boolean>;
  optionName: string;
}

export default function ToggleSwitch({
  option,
  setOption,
  optionName,
}: Props): ReactElement {
  return (
    <div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onClick={() => {
            setOption(!option);
          }}
          aria-label={`Turn ${optionName} on / off`}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
