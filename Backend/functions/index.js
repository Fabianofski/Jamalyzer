const functions = require("firebase-functions");
const express = require("express");
const jamList = require("./services/jamList.service");
const jamId = require("./services/jamID.service");
const jamData = require("./services/jamData.service");

const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/jamList", async (req, res) => {
  try {
    res.json(await jamList.fetchJamList());
  } catch (e) {
    res.json({errors: [e.message],});
  }
});

app.get("/api/jamId", async (req, res) => {
  try {
    res.json(await jamId.fetchJamID(req.query.jamUrl));
  } catch (e) {
    res.json({errors: [e.message],});
  }
});

app.get("/api/jamData", async (req, res) => {
  try {
    res.send(await jamData.fetchJamData(req.query.jamName));
  } catch (e) {
    res.json({errors: [e.message],});
  }
});

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
