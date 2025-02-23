import fetch from "node-fetch";
import { TMDBResponse } from "../../models/index.js";

export class TmdbService {
  public async getMovies(query: string): Promise<TMDBResponse> {
    const url = `https://api.themoviedb.org/3/search/movie?${query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };
    const res = await fetch(url, options);
    return res.json() as Promise<TMDBResponse>;
  }
}
