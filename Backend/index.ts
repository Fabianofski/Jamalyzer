import { Response, Request } from "express";

const { sendJobs } = require("./services/bull.service");
const express = require("express");
const jamListService = require("./services/jamList.service");
const jamIdService = require("./services/jamID.service");
const jamDataService = require("./services/jamData.service");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/jamList", async (_: Request, res: Response) => {
  try {
    res.json(await jamListService.fetchJamList());
  } catch (e: any) {
    res.json({ errors: [e.message] });
  }
});

app.get(
  "/api/jamId",
  async (req: Request<{ jamUrl: string }>, res: Response) => {
    try {
      res.json(await jamIdService.fetchJamID(req.query.jamUrl));
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
      res.json(await jamDataService.fetchJamData(jamName));
    } catch (e: any) {
      res.json({ errors: [e.message] });
    }
  }
);

app.get("/api/jobs", function (req: Request, res: Response) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  sendJobs(res);
});

app.listen(PORT, () =>
  console.log(`Listening in ${process.env.NODE_ENV} mode`)
);
