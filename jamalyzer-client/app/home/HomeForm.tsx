import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "@/styles/home/HomeForm.module.css";
import ReactGA from "react-ga4";

function HomeForm() {
  let input = "";
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    input = e.target.value;
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (!input.startsWith("https://itch.io/jam/")) {
      setError("Wrong Link!");
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
      return;
    }
    const jamName = input.replace("https://itch.io/jam/", "");
    sendAnalyticsEvent(jamName);
    router.push(`/jam/${jamName}`);
  };

  return (
    <form
      className={`${styles.form} ${shake ? styles.error : ""}`}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="https://itch.io/jam/..."
        name="JamURL"
        autoComplete="off"
        required
        onChange={onInputChange}
      />
      <button onClick={onSubmit} className={styles.submit}>
        ANALYZE
      </button>
      <p className={styles.errorText} key={shake ? "1" : "0"}>
        {error}
      </p>
    </form>
  );
}

function sendAnalyticsEvent(jamName: string) {
  if (ReactGA.isInitialized)
    ReactGA.event({
      category: "Jam Analysis",
      action: "Analyze custom jam",
      label: jamName,
    });
}

export default HomeForm;
