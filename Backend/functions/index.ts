import { Response, Request } from "express";

const functions = require("firebase-functions");
const express = require("express");
const jamList = require("./services/jamList.service");
const jamId = require("./services/jamID.service");
const jamData = require("./services/jamData.service");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/jamList", async (_: Request, res: Response) => {
  try {
    res.json(await jamList.fetchJamList());
  } catch (e: any) {
    res.json({ errors: [e.message] });
  }
});

app.get(
  "/api/jamId",
  async (req: Request<{ jamUrl: string }>, res: Response) => {
    try {
      res.json(await jamId.fetchJamID(req.query.jamUrl));
    } catch (e: any) {
      res.json({ errors: [e.message] });
    }
  }
);

app.get(
  "/api/jamData",
  async (req: Request<{ jamName: string }>, res: Response) => {
    try {
      const jamName = req.query.jamName;
      res.json(await jamData.fetchJamData(jamName));
    } catch (e: any) {
      res.json({ errors: [e.message] });
    }
  }
);

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
