const jamID = require("./jamID.service");
const fetch = require("node-fetch");
const jamPage = require("./jamPage.service");
const db = require("./db.service");
const { queue } = require("./bull.service");

async function fetchJamData(jamName) {
  const jamUrl = `https://itch.io/jam/${jamName}`;
  const jamId = await jamID.fetchJamID(jamUrl);

  const dbData = null; //await db.getJamData(jamId);
  if (dbData !== null) {
    console.log("Found cached data in database");
    if (dbData.version !== process.env.VERSION)
      console.log("Cached Data is deprecated");
    else return dbData;
  }
  console.log("Couldn't fetch data from database scrape itch.io");

  const data = await fetchItchServers(jamId, jamUrl);
  await db.postJamData(jamId, data);
  await queue.add(`Jam: ${jamId}`, data, {
    jobId: `jam_${jamId}`,
    removeOnComplete: true,
    removeOnFail: true,
  });
  return data;
}

async function fetchItchServers(jamId, jamUrl) {
  const [resEntries, resResults] = await Promise.all([
    fetch(`https://itch.io/jam/${jamId}/entries.json`),
    fetch(`https://itch.io/jam/${jamId}/results.json`),
  ]);
  const entries = await resEntries.json();
  const results = await resResults.json();
  const data = joinEntriesAndResults(entries, results);
  data["_id"] = jamId;
  data["version"] = process.env.VERSION;
  data["jam"] = await jamPage.fetchJamPage(jamUrl, jamId);
  return data;
}

const joinEntriesAndResults = (entries, results) => {
  if (results["results"] === undefined || results.results.length === 0)
    throw Error(
      "This jam hasn't ended or the results haven't been published yet!"
    );
  let jamData = {
    jam: {},
    jam_games: {},
    criteria: [],
    rankings: { Overall: {} },
  };
  results.results[0].criteria.forEach((criteria) => {
    jamData.criteria.push(criteria.name);
    jamData.rankings[criteria.name] = {};
  });
  if (!jamData.criteria.includes("Overall")) jamData.criteria.push("Overall");
  extractResultData(results, jamData);
  extractEntryData(entries, jamData);
  return jamData;
};

function extractResultData(results, jamData) {
  results.results.forEach((entry) => {
    const id = entry.id;
    const criteriaList = getCriteriaList(jamData, entry);
    jamData.jam_games[id] = {
      title: entry.title,
      id: id,
      rank: entry.rank,
      criteria: criteriaList,
      contributors: entry.contributors,
      jamPageUrl: entry.url,
    };
    addGameToRanking(jamData, criteriaList, id);
  });
}

function getCriteriaList(jamData, entry) {
  const criteriaList = entry.criteria;
  const overall = {
    raw_score: entry.raw_score,
    score: entry.score,
    rank: entry.rank,
    name: "Overall",
  };
  criteriaList.push(overall);
  return criteriaList;
}

function addGameToRanking(jamData, criteriaList, id) {
  criteriaList.forEach((criteria) => {
    if (criteria.name in jamData.rankings) {
      if (!(criteria.rank in jamData.rankings[criteria.name]))
        jamData.rankings[criteria.name][criteria.rank] = [];
      if (!jamData.rankings[criteria.name][criteria.rank].includes(id))
        jamData.rankings[criteria.name][criteria.rank].push(id);
    }
  });
}

function extractEntryData(entries, jamData) {
  entries.jam_games.forEach((entry) => {
    const id = entry.game.id;
    const karma =
      Math.log(1 + entry.coolness) -
      Math.log(1 + entry.rating_count) / Math.log(5);
    if (id in jamData.jam_games) {
      jamData.jam_games[id].platforms = entry.game.platforms
        ? entry.game.platforms
        : [];
      jamData.jam_games[id].url = entry.game.url;
      jamData.jam_games[id].rating_count = entry.rating_count;
      jamData.jam_games[id].ratings_given = entry.coolness;
      jamData.jam_games[id].karma = Math.round(karma * 1e2) / 1e2;
    }
  });
}

module.exports = {
  fetchJamData,
};
