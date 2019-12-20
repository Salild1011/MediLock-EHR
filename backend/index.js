import config from "./config.json";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

//Connet to DB using Mongoose
let db_connection = "";
if (config.db_connection === "local") {
  db_connection = process.env.DB_CONNECTION_LOCAL;
}

mongoose.connect(
  db_connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) throw error;
    console.log("Connected to Database");
    app.use(express.json());
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  }
);
