import { Job } from "bullmq";
import { Response } from "express";
import { jamJob, jobList } from "../model/jamJobs/jobList";
import { jamData } from "../model/jamData/jamData";

const { Queue, Worker, QueueEvents } = require("bullmq");
const { fetchExtendedJamData } = require("./extendedJamData.service");

const MAX_JOBS = 1;

const REDIS_CONFIG = {
  connection: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password:
      process.env.NODE_ENV === "PRODUCTION" ? process.env.REDIS_PASSWORD : "",
  },
};

const queue = new Queue("todo", {
  connection: REDIS_CONFIG.connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

const worker = new Worker(
  "todo",
  async (job: Job) => {
    await fetchExtendedJamData(job);
  },
  {
    concurrency: MAX_JOBS,
    connection: REDIS_CONFIG.connection,
  }
);

const queueEvents = new QueueEvents("todo", REDIS_CONFIG);

queueEvents.on("waiting", ({ jobId }: { jobId: string }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on("active", ({ jobId, prev }: { jobId: string; prev: string }) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on(
  "completed",
  ({ jobId, returnvalue }: { jobId: string; returnvalue: string }) => {
    console.log(`${jobId} has completed and returned ${returnvalue}`);
  }
);

queueEvents.on(
  "failed",
  ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
  }
);

queueEvents.on(
  "progress",
  ({ jobId, data }: { jobId: string; data: string }) => {
    console.log(
      `${jobId} reported progress ${(Number(data) * 100).toFixed(2)}%`
    );
  }
);

function sendJobs(res: Response) {
  queue.getJobs().then((jobs: Job[]) => {
    const jamJobs: jobList = { jobs: [] };
    jobs.forEach((job: Job) => {
      const jamData: jamData = job.data;
      const jamJob: jamJob = {
        jamLogo: jamData.jam.banner,
        jamTitle: jamData.jam.Title,
        jobProgress: (Number(job.progress) * 100).toFixed(2) + "%",
        jobState: String(job.getState()),
      };
      jamJobs.jobs.push(jamJob);
    });

    res.write("data: " + JSON.stringify(jamJobs) + "\n\n");
    setTimeout(() => sendJobs(res), 1000);
  });
}

module.exports = { worker, queue, sendJobs };
