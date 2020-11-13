import mongoose from "mongoose";
import { MONGO_URI } from "../../constants";

// const client = MongoClient.connect(url);
export class MongoConnection {
  async getConnection() {
    const url = MONGO_URI;
    let database: mongoose.Connection;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    database = mongoose.connection;
    database.once("open", async () => {
      console.log("Connected to database");
    });
    database.on("error", () => {
      console.log("Error connecting to database");
    });
    return database;
  }

  async disconnect() {
    return mongoose.disconnect();
  }
}
