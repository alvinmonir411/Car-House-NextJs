// lib/connectDB.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.VITE_URI;

if (!uri) {
  throw new Error("MongoDB URI not found in environment variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB(collectionName) {
  try {
    await client.connect();
    const db = client.db("services");
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
