import { TMDBResponse } from "./tmdb-response.js";

export class ApiResponse extends TMDBResponse {
  public source: "cache" | "tmdb";

  constructor(source: "cache" | "tmdb", response: TMDBResponse) {
    super();
    this.source = source;
    this.page = response.page;
    this.results = response.results;
    this.total_pages = response.total_pages;
    this.total_results = response.total_results;
  }
}
