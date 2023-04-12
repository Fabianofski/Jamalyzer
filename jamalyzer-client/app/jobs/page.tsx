"use client";

import React, { ReactElement, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import styles from "@/styles/jobs/jobs.module.css";
import { jamJob } from "@/model/jamJobs/jobList";
import Image from "next/image";

let WS_URL = `ws://localhost:7071`;
if (process.env.NODE_ENV === "production") WS_URL = `wss://jamalyzer.com/ws`;

function Jobs() {
  const [jobs, setJobs] = useState<jamJob[]>([]);

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (message: MessageEvent<any>) => {
      const json = JSON.parse(message.data);
      setJobs(json.jobs);
    },
  });

  const fillMissingRows = (tableEntries: number): ReactElement[] => {
    const rows = [];
    for (let i = tableEntries; i < 10; i++) {
      rows.push(<EmptyRow key={i} />);
    }
    return rows;
  };

  return (
    <div className={styles.jobs}>
      <title>Jamalyzer | Jobs</title>
      <div className={styles["table-wrapper"]}>
        <table className={styles.table}>
          <thead>
            <th>Jam Title</th>
            <th>State</th>
            <th>Progress</th>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              return <Job job={job} key={index} />;
            })}
            {fillMissingRows(jobs.length)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Job({ job }: { job: jamJob }) {
  return (
    <tr>
      <td className={styles["jam-title"]}>{job.jamTitle}</td>
      <td className={styles["job-state"]}>{job.jobState}</td>
      <td className={styles["job-progress"]}>{job.jobProgress}</td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td className={styles["jam-title"]}>-</td>
      <td className={styles["job-state"]}>-</td>
      <td className={styles["job-progress"]}>-</td>
    </tr>
  );
}

export default Jobs;
