import { jam } from "../model/jamData/jam";
import { CheerioAPI } from "cheerio";

const axios = require("axios");
const cheerio = require("cheerio");

const fetchJamPage = async (jamURL: string, jamId: string) => {
  const response = await axios.get(jamURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data: jam = {
    Title: "",
    banner: "",
    icon: "",
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
  };
  extractGeneralInfo($, data, jamId, jamURL);
  extractColor($, data);
  extractStats($, data);
  extractTwitter($, data);
  if (Number(data.entries) < 10)
    throw Error("This jam has less than 10 Entries!");
  return data;
};

function extractGeneralInfo(
  $: CheerioAPI,
  data: jam,
  jamId: string,
  jamURL: string
) {
  data["Title"] = $(".jam_title_header a").text();
  const banner = $(".jam_banner").attr("src");
  data["banner"] = banner ? banner : "";
  data["id"] = Number(jamId);
  data["url"] = jamURL;
  data["icon"] = $("meta[property='og:image']").attr("content") || "";
}

function extractColor($: CheerioAPI, data: jam) {
  const jam_theme = $('style[id="jam_theme"]').text();
  let startIndex = jam_theme.indexOf("color: ") + 7;
  data["color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex =
    jam_theme.indexOf(
      ".view_jam_page .stats_container a:hover {\n" + "  color: "
    ) + 51;
  data["secondary_color"] = jam_theme.substring(startIndex, startIndex + 7);
  startIndex = jam_theme.indexOf("background-color: ") + 18;
  data["bg_color"] = jam_theme.substring(startIndex, startIndex + 7);
}
function extractStats($: CheerioAPI, data: jam) {
  $(".stats_container .stat_value").each(function (idx, el) {
    const key: string = $(el).next().text().toLowerCase();
    // @ts-ignore
    data[key] = $(el).text();
  });

  let dates = $(".jam_submitter_widget span");
  data["started"] = $(dates[0]).text();
  data["ended"] = $(dates[1]).text();
}

function extractTwitter($: CheerioAPI, data: jam) {
  data["twitter"] = {
    hashtag: "#undefined",
    twitter_link: "https://www.twitter.com",
  };
  $(".jam_host_header a").each(function (idx, el) {
    if (!$(el).text().startsWith("#"))
      data["hosts"].push({
        username: $(el).text(),
        profile_link: $(el).attr("href") || "",
      });
    else
      data["twitter"] = {
        hashtag: $(el).text(),
        twitter_link: $(el).attr("href") || "",
      };
  });
}

module.exports = {
  fetchJamPage,
};
