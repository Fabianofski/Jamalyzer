//const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const {error} = require("firebase-functions/logger");

const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/jamId", async (req, res, next) => {
  const jamUrl = req.query.jamUrl;
  try {
    const id = await fetchJamID(jamUrl)
    res.json(id);
  } catch (e) {
    res.json({errors: [e],});
  }
});

const fetchJamID = async (jamURL) => {
  try {
    const response = await axios.get(jamURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const scriptStr = $(
      'div[class="jam_page_wrap"] > script[type="text/javascript"]'
    ).text();
    return extractJamID(scriptStr);
  } catch (e) {
    throw e;
  }
};

const extractJamID = (scriptStr) => {
  const idIndex = scriptStr.indexOf('"id":') + 5;
  let idEnd;
  for (let i = idIndex; i < scriptStr.length; i++) {
    let isNumber = scriptStr[i] >= "0" && scriptStr[i] <= "9";
    if (!isNumber) {
      idEnd = i;
      break;
    }
  }
  return scriptStr.substring(idIndex, idEnd);
};

app.get("/api/jamData", async (req, res) => {
  const jamName = req.query.jamName;
  const jamUrl = `https://itch.io/jam/${jamName}`;
  try {
    const jamId = await fetchJamID(jamUrl)
    const [resEntries, resResults] = await Promise.all([
      fetch(`https://itch.io/jam/${jamId}/entries.json`),
      fetch(`https://itch.io/jam/${jamId}/results.json`),
    ]);
    const jamInfo = await fetchJamPage(jamUrl, jamId)
    const entries = await resEntries.json();
    const results = await resResults.json();
    const data = joinEntriesAndResults(entries, results);
    data["jam"] = jamInfo;
    res.send(data);
  } catch (e) {
    res.json({errors: [e.message],});
  }
});

const fetchJamPage = async (jamURL, jamId) => {
  try {
    const response = await axios.get(jamURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = {};
    data["Title"] = $(".jam_title_header a").text();
    data["id"] = Number(jamId);
    data["url"] = jamURL;
    data["hosts"] = [];
    $(".stats_container .stat_value").each(function (idx, el) {
      data[$(el).next().text().toLowerCase()] = $(el).text();
    });
    $(".jam_host_header a").each(function (idx, el) {
      if (idx !== $(".jam_host_header a").length - 1)
        data["hosts"].push({username: $(el).text(), profile_link: $(el).attr("href")})
      else
        data["twitter"] = {hashtag: $(el).text(), twitter_link: $(el).attr("href")}
    });
    return data;
  } catch (e) {
    throw e;
  }
};

const joinEntriesAndResults = (entries, results) => {
  if (results.results.length === 0) throw Error("Jam hasn't ended yet!")
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
    const criteria = entry.criteria;
    const overall = {};
    overall.raw_score = entry.raw_score;
    overall.score = entry.score;
    overall.rank = entry.rank;
    overall.name = "Overall";
    criteria.push(overall);
    jamData.jam_games[id] = {};
    jamData.jam_games[id].title = entry.title;
    jamData.jam_games[id].id = id;
    jamData.jam_games[id].rank = entry.rank;
    jamData.jam_games[id].criteria = criteria;
    jamData.jam_games[id].contributors = entry.contributors;
    jamData.jam_games[id].jamPageUrl = entry.url;
    criteria.forEach((crit) => {
      if (crit.name in jamData.rankings) {
        if (!(crit.rank in jamData.rankings[crit.name]))
          jamData.rankings[crit.name][crit.rank] = [];
        if (!jamData.rankings[crit.name][crit.rank].includes(id))
          jamData.rankings[crit.name][crit.rank].push(id);
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

app.listen(PORT, () => console.log("Listening ..."));
//exports.app = functions.https.onRequest(app);
