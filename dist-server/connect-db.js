"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;

var _mongodb = require("mongodb");

const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myorganizer`;
let db = null;

async function connectDB() {
  if (db) return db;
  let client = await _mongodb.MongoClient.connect(url, {
    useNewUrlParser: true
  });
  db = client.db();
  console.info("Got DB,", db);
  return db;
} //connectDB();