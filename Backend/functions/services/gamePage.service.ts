import { entry } from "../model/jamData/entry";
import { CheerioAPI } from "cheerio";

const axios = require("axios");
const cheerio = require("cheerio");

const skippedParameters = ["platforms", "author"];

async function fetchGamePage(entry: entry) {
  const response = await axios
    .get(entry.url)
    .catch((e: any) =>
      console.error("Error when fetching " + entry.url + "\n" + e)
    );
  if (!response) return;
  const html = response.data;
  const $ = cheerio.load(html);
  entry.game_info_panel = {};
  $(".game_info_panel_widget tbody")
    .children()
    .each(function (idx: number, tr: CheerioAPI) {
      const title = camelCase($(tr).children().first().text());
      const content = $(tr).children().first().next().text().toLowerCase();
      if (!skippedParameters.includes(title)) {
        // @ts-ignore
        entry.game_info_panel[title] = content.split(", ") || [];
      }
    });
  return entry;
}

function camelCase(str: string) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 1; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join("");
}

module.exports = { fetchGamePage };
