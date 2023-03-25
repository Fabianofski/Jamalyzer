import { useRouter } from "next/navigation";
import React from "react";
import styles from "@/styles/home/HomeForm.module.css";
import ReactGA from "react-ga4";

function HomeForm() {
  let input = "";
  const router = useRouter();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    input = e.target.value;
  };

  const onSubmit = (): void => {
    if (!input.startsWith("https://itch.io/jam/"))
      return;
    const jamName = input.replace("https://itch.io/jam/", "");
    sendAnalyticsEvent(jamName);
    router.push(`/jam/${jamName}`);
  };

  return(
    <div className={styles.form}>
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
    </div>
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