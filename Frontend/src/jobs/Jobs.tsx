import React from "react";
import "./jobs.css";

function Jobs() {
  const url = "/api/jobs";

  if ("EventSource" in window) {
    let source = new EventSource(url);

    source.addEventListener(
      "message",
      function (e) {
        console.log(e.data);
      },
      false
    );

    source.addEventListener(
      "open",
      function (e) {
        console.log("connected!");
      },
      false
    );

    source.addEventListener(
      "error",
      function (e) {
        if (e.eventPhase == EventSource.CLOSED) source.close();
        // @ts-ignore
        if (e.target.readyState == EventSource.CLOSED) {
          console.log("Disconnected");
        }
        // @ts-ignore
        else if (e.target.readyState == EventSource.CONNECTING) {
          console.log("Connecting...");
        }
      },
      false
    );
  }

  return (
    <div className="jobs">
      <div className={"job"} style={{ justifyContent: "center" }}>
        <h2>No Jam processing</h2>
      </div>
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
      <Job />
    </div>
  );
}

function Job() {
  return (
    <div className={"job"}>
      <img
        src={"https://img.itch.zone/aW1nLzY1ODQ2NDUucG5n/140x111%23/%2FqT7FN.png"}
        alt={"jam-logo"}
      />
      <h2 className={"job-title"}>Brackeys Jam</h2>
      <div className={"job-progress"}>
        <h3>Waiting</h3>
        <h3>95%</h3>
      </div>
    </div>
  );
}

export default Jobs;
