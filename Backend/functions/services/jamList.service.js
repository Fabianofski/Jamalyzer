const axios = require("axios");
const cheerio = require("cheerio");

const fetchJamList = async () => {
  try {
    const url = "https://itch.io/jams/past/sort-submissions";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = []
    $(".jam_grid_widget").children().each(function (idx, el) {
      const hosts = [];
      if($(".jam_ranked", el).length === 0) return;
      $(".hosted_by", el).children().each(function (idxHost, elHost) {
        hosts.push({"name": $(elHost).text(), "profile_link": $(elHost).attr("href")})
      });
      data.push({
        "name" : $(".primary_info a", el).text(),
        "icon" : $(".jam_cover", el).attr("data-background_image"),
        "link": "https://itch.io" + $(".primary_info a", el).attr("href"),
        "hosts": hosts,
        "time": $(".date_countdown", el).text(),
        "joined": $(`.stat:contains("joined") .number`, el).text(),
        "submitted": $(`.stat:contains("submissions") .number`, el).text(),
      });
    });
    return { "jams": data };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  fetchJamList,
}