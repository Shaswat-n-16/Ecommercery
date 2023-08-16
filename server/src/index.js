import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger, { morganMiddleware } from "./logger";
import { connectDB } from "./utils/db.utils";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.send(`Server is running `);
});

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
