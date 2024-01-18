import fetch from "node-fetch";
import { SearchMovieRequest, SearchMovieResponse } from "@models";

const getQuery = (request: SearchMovieRequest) => {
  const params: Record<string, string> = {};
  Object.keys(request).forEach((key) => {
    if (request[key] !== undefined) {
      params[key] = `${request[key]}`;
    }
  });
  return new URLSearchParams(params).toString();
};

export const getMovies: (
  request: SearchMovieRequest
) => Promise<SearchMovieResponse> = async (request) => {
  const url = `https://api.themoviedb.org/3/search/movie?${getQuery(request)}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  return res.json() as Promise<SearchMovieResponse>;
};
