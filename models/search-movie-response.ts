import { Movie } from "./movie";

export class SearchMovieResponse {
  "page": number;
  "results": Array<Movie>;
  "total_pages": number;
  "total_results": number;
}
