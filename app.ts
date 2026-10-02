import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./utils/env.js";
import { authRouter } from "./routes/v1/auth.js";

import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers")),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authRouter);


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to Db sucessfully");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });
