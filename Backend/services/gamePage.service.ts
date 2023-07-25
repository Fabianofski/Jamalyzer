import { entry } from "../model/jamData/entry";
import { CheerioAPI } from "cheerio";
import { engineTriggers, engines } from "../model/itch/tools";

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

  const engineExists = engines.some(item => entry.game_info_panel["madeWith"]?.includes(item.toLowerCase())) || false;
  if(engineExists)
    return entry;

  const engine = await tryGetEngine($, entry.url);
  if(entry.game_info_panel["madeWith"])
    entry.game_info_panel["madeWith"].push(engine);
  else
    entry.game_info_panel["madeWith"] = [engine];
  return entry;
}

async function tryGetEngine(gamePage: CheerioAPI, title: string) : Promise<string> {
  const iFramePlaceholder = gamePage(".iframe_placeholder").attr("data-iframe");
  if(iFramePlaceholder === undefined) return "unknown";
  const iFrameCheerio = cheerio.load(iFramePlaceholder);
  const src = iFrameCheerio("iframe").attr("src");

  if(src === undefined) return "unknown";

  const response = await axios
    .get(src)
    .catch((e: any) =>
      console.error("Error when fetching " + src + "\n" + e)
    );
  if (!response) return "unknown";
  const html = response.data;
  const htmlText = cheerio.load(html).text();

  for (let engine in engineTriggers) {
    for (let trigger of engineTriggers[engine]) {
      if(htmlText.includes(trigger)) {
        return engine;
      }
    }
  }
  return "unknown";
}

function camelCase(str: string) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 1; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join("");
}

module.exports = { fetchGamePage, tryGetEngine };