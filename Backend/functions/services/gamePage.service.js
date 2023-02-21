const axios = require("axios");
const cheerio = require("cheerio");

async function fetchGamePage(entry) {
  const response = await axios
    .get(entry.url)
    .catch((e) => console.error("Error when fetching " + entry.url + "\n" + e));
  if (!response) return;
  const html = response.data;
  const $ = cheerio.load(html);

  $(".game_info_panel_widget table tbody")
    .children()
    .each(function (idx, tr) {
      $(tr)
        .children()
        .each(function (idx, td) {
          console.log($(td).text() + "\n");
        });
    });

  return entry;
}

module.exports = { fetchGamePage };
