import logger from "@edonec/logger";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { baseUrl } from "init";
import mongoose, { ConnectOptions, connect } from "mongoose";
import router from "routes";
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
      logger.info(`🚀 Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
