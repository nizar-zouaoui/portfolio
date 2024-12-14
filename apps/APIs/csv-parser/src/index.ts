import logger from "@edonec/logger";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { baseUrl } from "init";
import router from "routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;
app.use(
  cors({
    credentials: true,
  })
);
app.use(json());
app.use(baseUrl, router);
app.listen(PORT, () => {
  logger.info(`🚀 Server listening at http://localhost:${PORT}`);
});
