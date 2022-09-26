const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)

const cors = require('cors')({origin: true});
app.use(cors);

app.get("/api/jamid", (req, res) => {
  const jamURL = req.query.jamurl;
  if(jamURL.startsWith("https://itch.io/jam")){
    fetchJamID(jamURL).then((id) => res.json(id));
  }
  else{
    res.json("Invalid URL!")
  }
});

const fetchJamID = async (jamURL) => {
try {
  const response = await axios.get(jamURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const scriptStr = $('div[class="jam_page_wrap"] > script[type="text/javascript"]').text();
  return extractJamID(scriptStr);
} catch (error) {
    throw error;
}};

const extractJamID = (scriptStr) => {
  const idIndex = scriptStr.indexOf("\"id\":") + 5;
  let idEnd;
  for (let i = idIndex; i < scriptStr.length; i++) {
    let isNumber = scriptStr[i] >= '0' && scriptStr[i] <= '9';
    if(!isNumber){
      idEnd = i;
      break;
    }
  }
  return scriptStr.substring(idIndex, idEnd);
}

app.listen(PORT, () => {
  console.log('Listening ...')
})