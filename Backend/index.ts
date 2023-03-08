import { Response, Request } from "express";

const { sendJobs } = require("./services/bull.service");
const express = require("express");
const jamListService = require("./services/jamList.service");
const jamIdService = require("./services/jamID.service");
const jamDataService = require("./services/jamData.service");
const WebSocket = require("ws");

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

const wss = new WebSocket.Server({ port: 7071 });
const users = new Set();
wss.on("connection", (ws: any) => {
  const userRef = {
    ws,
  };
  users.add(userRef);

  ws.on("error", console.error);

  ws.on("close", (code: string, reason: any) => {
    users.delete(userRef);
    console.log(`Connection closed: ${code} ${reason}!`);
  });
  console.log("New User!");
});
sendJobs(users);

app.listen(PORT, () =>
  console.log(`Listening in ${process.env.NODE_ENV} mode`)
);
