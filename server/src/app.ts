import express from "express";
import env from "dotenv";
import { SearchMovieRequest } from "../../models/search-movie-request.js";
import { CacheService } from "./cache.service.js";
import { TmdbService } from "./tmdb.service.js";

env.config();
const app = express();
const port = 4000;
const cache = new CacheService();

const getQuery = (request: SearchMovieRequest) => {
  const params: Record<string, string> = {};
  Object.keys(request).forEach((key) => {
    if (request[key] !== undefined) {
      params[key] = `${request[key]}`;
    }
  });
  return new URLSearchParams(params).toString();
};

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  try {
    const query = getQuery({ query: "pulp", page: 1 });
    let response = await cache.get(query);
    if (!response) {
      response = await new TmdbService().getMovies(query);
      console.log("From API");
      cache.set(query, response);
    } else {
      console.log("From cache");
    }

    res.end(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
