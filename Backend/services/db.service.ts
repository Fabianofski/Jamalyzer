import { jamData } from "../model/jamData/jamData";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri =
  process.env.NODE_ENV === "PRODUCTION"
    ? `mongodb://${process.env.MONGO_AUTH}@${process.env.MONGO_HOST}`
    : `mongodb://${process.env.MONGO_HOST}`;

async function postJamData(jamId: string, data: jamData) {
  try {
    const client = new MongoClient(uri);

    console.log(`Save Jam with id: ${jamId} to MongoDB`);
    const db = client.db("jamalyzer");
    const collection = db.collection("jams");
    await collection.updateOne(
      { _id: jamId },
      { $set: data },
      { upsert: true }
    );
    console.log(`Saved Jam: ${jamId}`);

    await client.close();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getJamData(jamId: string) {
  try {
    const client = new MongoClient(uri);

    console.log(`Try getting Jam: ${jamId} from MongoDB`);
    const db = client.db("jamalyzer");
    const collection = db.collection("jams");
    const jamData = await collection.findOne({ _id: jamId });
    await client.close();
    return jamData;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  postJamData,
  getJamData,
};
