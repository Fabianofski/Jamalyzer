import { Job } from "bullmq";

const { fetchGamePage } = require("./gamePage.service");
const { postJamData } = require("./db.service");

async function fetchExtendedJamData(job: Job) {
  console.log("fetch data for: " + job.data.jam.Title);

  const jamData = job.data;
  const gameIds = Object.keys(jamData.jam_games);
  for (let i = 0; i < gameIds.length; i += 5) {
    const progress: number = i / gameIds.length;
    await job.updateProgress(progress);
    await Promise.all([
      ...gameIds.slice(i, i + 5).map(async (id) => {
        jamData.jam_games[id] =
          (await fetchGamePage(jamData.jam_games[id])) || jamData.jam_games[id];
      }),
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
    ]);
  }
  await postJamData(jamData._id, jamData);
}

module.exports = { fetchExtendedJamData };
