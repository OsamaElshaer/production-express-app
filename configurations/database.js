const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);

let db;

// Database Name
const dbName = "myProject";

async function dbConnection(cb) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to db");
  db = client.db(dbName);
  //collections
  return cb();
}

const getDb = () => {
  if (!db) {
    throw new Error("can not reach db");
  }
  return db;
};

module.exports = {
  dbConnection,
  getDb,
};
