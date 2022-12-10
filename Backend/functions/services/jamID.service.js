const axios = require("axios");
const cheerio = require("cheerio");

const fetchJamID = async (jamURL) => {
  try {
    const response = await axios.get(jamURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const scriptStr = $(
      'div[class="jam_page_wrap"] > script[type="text/javascript"]'
    ).text();
    return extractJamID(scriptStr);
  } catch (e) {
    throw e;
  }
};

const extractJamID = (scriptStr) => {
  const idIndex = scriptStr.indexOf('"id":') + 5;
  let idEnd;
  for (let i = idIndex; i < scriptStr.length; i++) {
    let isNumber = scriptStr[i] >= "0" && scriptStr[i] <= "9";
    if (!isNumber) {
      idEnd = i;
      break;
    }
  }
  return scriptStr.substring(idIndex, idEnd);
};

module.exports = {
  fetchJamID,
}