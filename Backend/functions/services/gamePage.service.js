const axios = require("axios");
const cheerio = require("cheerio");

async function fetchGamePage(entry) {
  const response = await axios
    .get(entry.url)
    .catch((e) => console.error("Error when fetching " + entry.url + "\n" + e));
  if (!response) return;
  const html = response.data;
  const $ = cheerio.load(html);

  return entry;
}

module.exports = { fetchGamePage };
