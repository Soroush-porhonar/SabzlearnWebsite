import express from "express";
import "dotenv/config";

const app = express();
const port = 3000;

app.listen(process.env.port, () => {
  console.log(`Server listening on port ${process.env.port}`);
});
