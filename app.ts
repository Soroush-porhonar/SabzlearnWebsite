import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./utils/env.js";
import cors from "cors";
import { fileURLToPath } from "node:url";
//import "dotenv/config";

import { authRouter } from "./routes/v1/auth.js";
import { userRouter } from "./routes/v1/user.js";
import { categoryRouter } from "./routes/v1/category.js";
import { courseRouter } from "./routes/v1/course.js";

const app = express();

app.use(
  "/courses/covers",
  express.static(
    fileURLToPath(new URL("./public/courses/covers", import.meta.url)),
  ),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);

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
