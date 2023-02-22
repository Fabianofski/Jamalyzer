import { Job } from "bullmq";

const { Queue, Worker, QueueEvents } = require("bullmq");
const { fetchExtendedJamData } = require("./extendedJamData.service");

const MAX_JOBS = 1;

const REDIS_CONFIG = {
  connection: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
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
  ({ jobId, data }: { jobId: string; data: string }, timestamp: string) => {
    console.log(`${jobId} reported progress ${data} at ${timestamp}`);
  }
);

queue.clean(0, 50).then((e: any) => console.log(e));
queue.getJobs().then((e: any) => console.log(e));

module.exports = { worker, queue };
