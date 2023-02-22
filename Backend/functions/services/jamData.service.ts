import { jamData } from "../model/jamData/jamData";
import { entryList, entryListObject } from "../model/itch/entryList";
import {
  resultList,
  resultListCriteria,
  resultListObject,
} from "../model/itch/resultList";

const jamID = require("./jamID.service");
const fetch = require("node-fetch");
const jamPage = require("./jamPage.service");
const db = require("./db.service");
const { queue } = require("./bull.service");

let jamData: jamData = {
  _id: "",
  version: "0.1",
  jam: {
    Title: "",
    banner: "",
    bg_color: "",
    color: "",
    ended: "",
    entries: "",
    hosts: [],
    id: 0,
    ratings: "",
    secondary_color: "",
    started: "",
    twitter: { hashtag: "", twitter_link: "" },
    url: "",
  },
  jam_games: {},
  criteria: [],
  rankings: { Overall: {} },
};

async function fetchJamData(jamName: string) {
  const jamUrl = `https://itch.io/jam/${jamName}`;
  const jamId = await jamID.fetchJamID(jamUrl);

  const dbData = await db.getJamData(jamId);
  if (dbData !== null) {
    console.log("Found cached data in database");
    if (dbData.version !== process.env.VERSION)
      console.log("Cached Data is deprecated");
    else return dbData;
  }
  console.log("Couldn't fetch data from database scrape itch.io");

  const data: jamData = await fetchItchServers(jamId, jamUrl);
  await db.postJamData(jamId, data);
  await queue.add(`Jam: ${jamId}`, data, {
    jobId: `jam_${jamId}`,
    removeOnComplete: true,
    removeOnFail: true,
  });
  return data;
}

async function fetchItchServers(jamId: string, jamUrl: string) {
  const [resEntries, resResults] = await Promise.all([
    fetch(`https://itch.io/jam/${jamId}/entries.json`),
    fetch(`https://itch.io/jam/${jamId}/results.json`),
  ]);
  const entries: entryList = await resEntries.json();
  const results: resultList = await resResults.json();
  const data: jamData = joinEntriesAndResults(entries, results);
  data["_id"] = jamId;
  data["version"] = process.env.VERSION || "undefined";
  data["jam"] = await jamPage.fetchJamPage(jamUrl, jamId);
  return data;
}

const joinEntriesAndResults = (entries: entryList, results: resultList) => {
  if (results["results"] === undefined || results.results.length === 0)
    throw Error(
      "This jam hasn't ended or the results haven't been published yet!"
    );
  results.results[0].criteria.forEach((criteria: resultListCriteria) => {
    jamData.criteria.push(criteria.name);
    jamData.rankings[criteria.name] = {};
  });
  if (!jamData.criteria.includes("Overall")) jamData.criteria.push("Overall");
  extractResultData(results, jamData);
  extractEntryData(entries, jamData);
  return jamData;
};

function extractResultData(results: resultList, jamData: jamData) {
  results.results.forEach((entry: resultListObject) => {
    const id = entry.id;
    const criteriaList = getCriteriaList(jamData, entry);
    jamData.jam_games[id] = {
      game_info_panel: {},
      karma: 0,
      platforms: [],
      rating_count: 0,
      ratings_given: 0,
      url: "",
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

function getCriteriaList(jamData: jamData, entry: resultListObject) {
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

function addGameToRanking(
  jamData: jamData,
  criteriaList: resultListCriteria[],
  id: number
) {
  criteriaList.forEach((criteria) => {
    if (criteria.name in jamData.rankings) {
      if (!(criteria.rank in jamData.rankings[criteria.name]))
        jamData.rankings[criteria.name][criteria.rank] = [];
      if (!jamData.rankings[criteria.name][criteria.rank].includes(id))
        jamData.rankings[criteria.name][criteria.rank].push(id);
    }
  });
}

function extractEntryData(entries: entryList, jamData: jamData) {
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
