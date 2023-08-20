import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import logger, { morganMiddleware } from "./logger";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";

import { connectDB } from "./utils/db.utils";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running `);
});

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
  console.log(`Server is listening on port ${PORT}`);
});
