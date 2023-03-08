import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import "./jobs.css";
import { jamJob } from "../model/jamJobs/jobList";

let WS_URL = `ws://${window.location.hostname}:7071`;
// @ts-ignore
if (import.meta.env.PROD) WS_URL = `wss://${window.location.hostname}/ws`;
console.log(WS_URL);

function Jobs() {
  document.title = "Jamalyzer | Jobs";

  const [jobs, setJobs] = useState<jamJob[]>([]);

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (message: MessageEvent<any>) => {
      const json = JSON.parse(message.data);
      setJobs(json.jobs);
    }
  });

  return (
    <div className="jobs">
      {jobs.map((job: jamJob, index: number) => {
        return <Job job={job} key={index} />;
      })}
      {jobs.length === 0 ? (
        <div className={"job"} style={{ justifyContent: "center" }}>
          <h2>No Jam processing</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Job({ job }: { job: jamJob }) {
  return (
    <div className={"job"}>
      <img src={job.jamLogo} alt={"jam-logo"} />
      <h2 className={"job-title"}>{job.jamTitle}</h2>
      <div className={"job-progress"}>
        <h3>{job.jobState}</h3>
        <h3 className={"job-percentage"}>{job.jobProgress}</h3>
      </div>
    </div>
  );
}

export default Jobs;
