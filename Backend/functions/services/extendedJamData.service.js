const { fetchGamePage } = require("./gamePage.service");

async function fetchExtendedJamData(job) {
  console.log("fetch data for: " + job.data.jam.Title);

  const jamData = job.data;
  const gameIds = Object.keys(jamData.jam_games);
  for (let i = 0; i < 1; i += 1) {
    await Promise.all([
      ...gameIds.slice(i, i + 1).map((id) => {
        jamData.jam_games[id] = fetchGamePage(jamData.jam_games[id]);
      }),
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
    ]);
  }
}

module.exports = { fetchExtendedJamData };