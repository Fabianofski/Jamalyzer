import { jamCard } from "../model/jamData/jamCard";
import { CheerioAPI } from "cheerio";
const axios = require("axios");
const cheerio = require("cheerio");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchJamList = async () => {
  try {
    const url = "https://itch.io/jams/past/sort-submissions";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data: jamCard[] = [];

    const jamList = $(".jam_grid_widget").children();
    for (const el of jamList) {
      if ($(".jam_ranked", el).length === 0) continue;
      data.push(await extractData($, el));
      await delay(200);
    }

    return { jams: data };
  } catch (e) {
    throw e;
  }
};

async function extractData($: any, el: CheerioAPI): Promise<jamCard> {
  const hosts: { name: string; profile_link: string }[] = [];

  $(".hosted_by", el)
    .children()
    .each(function (idxHost: number, elHost: CheerioAPI) {
      hosts.push({
        name: $(elHost).text(),
        profile_link: $(elHost).attr("href") || "",
      });
    });

  const link = "https://itch.io" + $(".primary_info a", el).attr("href");
  const icon = await getIcon(link);

  return {
    name: $(".primary_info a", el).text(),
    icon: icon,
    link: link,
    hosts: hosts,
    time: $(".date_countdown", el).text(),
    joined: $(`.stat:contains("joined") .number`, el).text(),
    submitted: $(`.stat:contains("submissions") .number`, el).text(),
  };
}

async function getIcon(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    return $("meta[property='og:image']").attr("content") || "";
  } catch (e: any) {
    console.log(e);
    return "";
  }
}

module.exports = {
  fetchJamList,
};
