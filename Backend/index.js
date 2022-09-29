const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch');

const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)

const cors = require('cors')({origin: true});
app.use(cors);

app.get("/api/jamid", (req, res) => {
  const jamURL = req.query.jamurl;
  if(jamURL.startsWith("https://itch.io/jam")){
    fetchJamID(jamURL).then((id) => res.json(id));
  }
  else{
    res.json("Invalid URL!")
  }
});

const fetchJamID = async (jamURL) => {
try {
  const response = await axios.get(jamURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const scriptStr = $('div[class="jam_page_wrap"] > script[type="text/javascript"]').text();
  return extractJamID(scriptStr);
} catch (error) {
    throw error;
}};

const extractJamID = (scriptStr) => {
  const idIndex = scriptStr.indexOf("\"id\":") + 5;
  let idEnd;
  for (let i = idIndex; i < scriptStr.length; i++) {
    let isNumber = scriptStr[i] >= '0' && scriptStr[i] <= '9';
    if(!isNumber){
      idEnd = i;
      break;
    }
  }
  return scriptStr.substring(idIndex, idEnd);
}

app.get("/api/jamdata", async (req, res) => {
  const jamid = req.query.jamid;
  console.log("try");
  try {
    const [resEntries, resResults] = await Promise.all([
        fetch(`https://itch.io/jam/${jamid}/entries.json`),
        fetch(`https://itch.io/jam/${jamid}/results.json`)
    ]);
    const entries = await resEntries.json();
    const results = await resResults.json();
    const data = joinEntriesAndResults(entries, results);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

const joinEntriesAndResults = (entries, results) => {
  let jamData = {"jam_games":{}, "criteria":[]};
  results.results[0].criteria.forEach((criteria) => jamData.criteria.push(criteria.name));
  extractResultData(results, jamData);
  extractEntryData(entries, jamData);
  return jamData;
}

function extractResultData(results, jamData) {
  results.results.forEach(entry => {
    const id = entry.id;
    const criteria = entry.criteria;
    const overall = {};
    overall.raw_score = entry.raw_score;
    overall.score = entry.score;
    overall.rank = entry.rank;
    overall.name = "Overall";
    criteria.push(overall);
    jamData.jam_games[id] = {};
    jamData.jam_games[id].id = id;
    jamData.jam_games[id].rank = entry.rank;
    jamData.jam_games[id].criteria = criteria;
  });
}

function extractEntryData(entries, jamData) {
  entries.jam_games.forEach(entry => {
    const id = entry.game.id;
    const karma = Math.log(1 + entry.coolness) - Math.log(1 + entry.rating_count) / Math.log(5);
    if (id in jamData.jam_games) {
      jamData.jam_games[id].title = entry.game.title;
      jamData.jam_games[id].platforms = entry.game.platforms;
      jamData.jam_games[id].url = entry.game.url;
      jamData.jam_games[id].contributors = entry.contributors;
      jamData.jam_games[id].jamPageUrl = entry.url;
      jamData.jam_games[id].rating_count = entry.rating_count;
      jamData.jam_games[id].ratings_given = entry.coolness;
      jamData.jam_games[id].karma = karma.toFixed(2);
    }
  });
}

app.listen(PORT, () => {
  console.log('Listening ...')
})