const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbClient;
let favoritesCollection;
let usersCollection;

async function connectToDatabase() {
  if (dbClient) {
    console.log("Reusing existing database connection.");
    return dbClient.db("MealInventory");
  }

  try {
    dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await dbClient.connect();
    const mealdb = dbClient.db("MealInventory");
    usersCollection = mealdb.collection("users");
    favoritesCollection = mealdb.collection("favorites");

    console.log("Successfully connected to DB!");
    return mealdb;
  } catch (error) {
    console.error("Failed to connect to DB", error);
    throw error;
  }
}

async function closeConnection() {
  if (dbClient) {
    await dbClient.close();
    console.log("Connection to database closed.");
  }
}

module.exports = { connectToDatabase, closeConnection };
