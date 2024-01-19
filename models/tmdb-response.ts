import { Movie } from "./movie.js";

export class TMDBResponse {
  "page": number;
  "results": Array<Movie>;
  "total_pages": number;
  "total_results": number;
}
