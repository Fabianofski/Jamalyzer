const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function postJamData(jamId, data){
  try {
    const client = new MongoClient(uri);
    
    console.log(`Save Jam with id: ${jamId} to MongoDB`);
    const db = client.db('jamalyzer');
    const collection = db.collection('jams');
    await collection.updateOne({_id: jamId}, {$set: data}, {upsert: true});
    console.log(`Saved Jam: ${jamId}`);
    
    await client.close();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getJamData(jamId){
  try {
    const client = new MongoClient(uri);
  
    console.log(`Try getting Jam: ${jamId} from MongoDB`);
    const db = client.db('jamalyzer');
    const collection = db.collection('jams');
    const jamData = await collection.findOne({_id: jamId});
    await client.close();
    return jamData;
  }catch (e) {
    console.error(e);
  }
  
}

module.exports = {
  postJamData,
  getJamData,
}