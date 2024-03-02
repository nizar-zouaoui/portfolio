import express from "express";
import dotenv from "dotenv";
import { baseUrl } from "./init";
import { json } from "body-parser";
import router from "./routes";
import mongoose, { ConnectOptions, connect } from "mongoose";
import cors from "cors";
const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(
  cors({
    credentials: true,
  })
);
app.use(json());
app.use(baseUrl, router);
mongoose.Promise = Promise;
connect(`${process.env.DATABASE_URI}`, databaseConfig)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
