import React, { useEffect, useState } from "react";
import "./jobs.css";
import { jobList, jamJob } from "../model/jamJobs/jobList";

function Jobs() {
  const url = "/api/jobs";
  const [jobs, setJobs] = useState<jamJob[]>([]);
  useEffect(() => {
    if ("EventSource" in window) {
      let source = new EventSource(url);

      source.addEventListener(
        "message",
        function (e) {
          console.log("message");
          const response: jobList = JSON.parse(e.data);
          setJobs(response.jobs);
        },
        false
      );
    }
  }, []);

  return (
    <div className="jobs">
      {jobs.map((job: jamJob) => {
        return <Job job={job} />;
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
