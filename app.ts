import express from "express";
import mongoose from "mongoose";
import { mongoUri, port } from "./utils/env.js";
import { Router as authRouter } from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers")),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false }));
app.use("./v1/auth", authRouter);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to Db sucessfully");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });
