import express from "express";
import dotenv from "dotenv";
import { baseUrl } from "./init";
import { json } from "body-parser";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(json());
app.use(baseUrl, router);

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
