import fetch from "node-fetch";

export const getMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/search/movie?query=pulp&include_adult=false&language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  return res.json();
};
