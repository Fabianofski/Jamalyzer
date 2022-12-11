const axios = require("axios");
const cheerio = require("cheerio");

const fetchJamPage = async (jamURL, jamId) => {
  const response = await axios.get(jamURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data = {};
  data["Title"] = $(".jam_title_header a").text();
  const banner = $(".jam_banner").attr("src");
  data["banner"] = banner ? banner : "";
  const jam_theme = $("style[id=\"jam_theme\"]").text();
  let startIndex = jam_theme.indexOf('color: ') + 7;
  data["color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex = jam_theme.indexOf('.view_jam_page .stats_container a:hover {\n' +
    '  color: ') + 51;
  data["secondary_color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex = jam_theme.indexOf('background-color: ') + 18;
  data["bg_color"] = jam_theme.substring(startIndex, startIndex + 7);
  data["id"] = Number(jamId);
  data["url"] = jamURL;
  data["hosts"] = [];
  $(".stats_container .stat_value").each(function (idx, el) {
    data[$(el).next().text().toLowerCase()] = $(el).text();
  });
  data["twitter"] = {hashtag: "#undefined", twitter_link: "https://www.twitter.com"}
  $(".jam_host_header a").each(function (idx, el) {
    if (!$(el).text().startsWith("#"))
      data["hosts"].push({username: $(el).text(), profile_link: $(el).attr("href")})
    else
      data["twitter"] = {hashtag: $(el).text(), twitter_link: $(el).attr("href")}
  });
  if(data.entries < 10)
    throw Error("This Jam has less than 10 Entries!")
  return data;
};

module.exports = {
  fetchJamPage,
}