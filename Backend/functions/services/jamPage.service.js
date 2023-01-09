const axios = require("axios");
const cheerio = require("cheerio");

const fetchJamPage = async (jamURL, jamId) => {
  const response = await axios.get(jamURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data = {};
  extractGeneralInfo(data, $, jamId, jamURL);
  extractColor($, data);
  extractStats($, data);
  extractTwitter(data, $);
  if(data.entries < 10)
    throw Error("This jam has less than 10 Entries!")
  return data;
};

function extractGeneralInfo(data, $, jamId, jamURL) {
  data["Title"] = $(".jam_title_header a").text();
  const banner = $(".jam_banner").attr("src");
  data["banner"] = banner ? banner : "";
  data["id"] = Number(jamId);
  data["url"] = jamURL;
  data["hosts"] = [];
}

function extractColor($, data) {
  const jam_theme = $("style[id=\"jam_theme\"]").text();
  let startIndex = jam_theme.indexOf('color: ') + 7;
  data["color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex = jam_theme.indexOf('.view_jam_page .stats_container a:hover {\n' +
    '  color: ') + 51;
  data["secondary_color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex = jam_theme.indexOf('background-color: ') + 18;
  data["bg_color"] = jam_theme.substring(startIndex, startIndex + 7);
}
function extractStats($, data) {
  $(".stats_container .stat_value").each(function (idx, el) {
    data[$(el).next().text().toLowerCase()] = $(el).text();
  });
  
  let dates = $(".jam_submitter_widget span");
  data["started"] = $(dates[0]).text();
  data["ended"] = $(dates[1]).text();
}

function extractTwitter(data, $) {
  data["twitter"] = {hashtag: "#undefined", twitter_link: "https://www.twitter.com"}
  $(".jam_host_header a").each(function (idx, el) {
    if (!$(el).text().startsWith("#"))
      data["hosts"].push({username: $(el).text(), profile_link: $(el).attr("href")})
    else
      data["twitter"] = {hashtag: $(el).text(), twitter_link: $(el).attr("href")}
  });
}

module.exports = {
  fetchJamPage,
}