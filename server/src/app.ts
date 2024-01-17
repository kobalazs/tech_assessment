import express from "express";
import { getMovies } from "./tmdb.service.js";
import env from "dotenv";

env.config();
const app = express();
const port = 4000;

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(await getMovies()));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
