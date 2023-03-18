"use client";
import React, { useState } from "react";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";

function HomeForm() {
  let input = "";
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    input = e.target.value;
  };

  const onSubmit = (): void => {
    if (!input.startsWith("https://itch.io/jam/")) {
      setError("Invalid URL");
      return;
    }
    const jamName = input.replace("https://itch.io/jam/", "");
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze custom jam",
        label: jamName,
      });
    router.push(`/jam/${jamName}`);
  };

  return(
    <div className="form">
    <input
      type="text"
      placeholder="https://itch.io/jam/..."
      name="JamURL"
      autoComplete="off"
      required
      onChange={onInputChange}
    />
    <div className="error">
      <p> {error} </p>
    </div>
    <button onClick={onSubmit} className="submit">
      <div>
        <p>ANALYZE</p>
      </div>
    </button>
  </div>
  );
}

export default HomeForm;