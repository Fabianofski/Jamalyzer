const jamID = require("./jamID.service");
const fetch = require("node-fetch");
const jamPage = require("./jamPage.service");

async function fetchJamData(jamName){
  const jamUrl = `https://itch.io/jam/${jamName}`;
  const jamId = await jamID.fetchJamID(jamUrl)
  const [resEntries, resResults] = await Promise.all([
    fetch(`https://itch.io/jam/${jamId}/entries.json`),
    fetch(`https://itch.io/jam/${jamId}/results.json`),
  ]);
  const entries = await resEntries.json();
  const results = await resResults.json();
  const data = joinEntriesAndResults(entries, results);
  data["jam"] = await jamPage.fetchJamPage(jamUrl, jamId);
  return data;
}

const joinEntriesAndResults = (entries, results) => {
  if (results["results"] === undefined || results.results.length === 0)
    throw Error("This Jam hasn't ended or the results haven't been published yet!")
  let jamData = { jam: {}, jam_games: {}, criteria: [], rankings: { Overall: {} } };
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
    const criteriaList = entry.criteria;
    const overall = {};
    overall.raw_score = entry.raw_score;
    overall.score = entry.score;
    overall.rank = entry.rank;
    overall.name = "Overall";
    criteriaList.push(overall);
    jamData.jam_games[id] = {};
    jamData.jam_games[id].title = entry.title;
    jamData.jam_games[id].id = id;
    jamData.jam_games[id].rank = entry.rank;
    jamData.jam_games[id].criteria = criteriaList;
    jamData.jam_games[id].contributors = entry.contributors;
    jamData.jam_games[id].jamPageUrl = entry.url;
    criteriaList.forEach((criteria) => {
      if (criteria.name in jamData.rankings) {
        if (!(criteria.rank in jamData.rankings[criteria.name]))
          jamData.rankings[criteria.name][criteria.rank] = [];
        if (!jamData.rankings[criteria.name][criteria.rank].includes(id))
          jamData.rankings[criteria.name][criteria.rank].push(id);
      }
    });
  });
}

function extractEntryData(entries, jamData) {
  entries.jam_games.forEach((entry) => {
    const id = entry.game.id;
    const karma =
      Math.log(1 + entry.coolness) -
      Math.log(1 + entry.rating_count) / Math.log(5);
    if (id in jamData.jam_games) {
      jamData.jam_games[id].platforms = entry.game.platforms;
      jamData.jam_games[id].url = entry.game.url;
      jamData.jam_games[id].rating_count = entry.rating_count;
      jamData.jam_games[id].ratings_given = entry.coolness;
      jamData.jam_games[id].karma = Math.round(karma * 1e2) / 1e2;
    }
  });
}

module.exports =  {
  fetchJamData,
}