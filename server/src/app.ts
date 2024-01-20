import express from "express";
import env from "dotenv";
import cors from "cors";
import { TMDBRequest } from "../../models/tmdb-request.js";
import { CacheService } from "./cache.service.js";
import { TmdbService } from "./tmdb.service.js";
import { CacheRecord } from "../../models/cache-record.js";
import { ApiResponse } from "../../models/api-response.js";

env.config();
const app = express();
const port = 4000;
const cache = new CacheService();

const getHttpQuery = (request: TMDBRequest) => {
  const params: Record<string, string> = {};
  Object.keys(request).forEach((key) => {
    if (request[key] !== undefined) {
      params[key] = `${request[key]}`;
    }
  });
  return new URLSearchParams(params).toString();
};

const getResponse = async (query: string) => {
  let cacheRecord = await cache.get(query);
  if (cacheRecord?.hadAccessOverMinutes(2)) {
    cacheRecord.hitCount++;
    return new ApiResponse("cache", cacheRecord.response);
  }
  cacheRecord = new CacheRecord(
    query,
    await new TmdbService().getMovies(query)
  );
  cache.set(cacheRecord);
  return new ApiResponse("tmdb", cacheRecord.response);
};

app.use(cors());

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  try {
    const query = getHttpQuery(req.query as unknown as TMDBRequest);
    res.end(JSON.stringify(await getResponse(query)));
  } catch (error) {
    res.status(500).end("Server error");
    console.error(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
