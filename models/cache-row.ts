import { SearchMovieResponse } from "./search-movie-response";

export class CacheRow {
  public query: string;
  public response: SearchMovieResponse;
  public hitCount?: number;
  public lastAccess?: Date;

  public constructor(
    query: string,
    response: SearchMovieResponse,
    hitCount?: number,
    lastAccess?: Date
  ) {
    this.query = query;
    this.response = response;
    this.hitCount = hitCount;
    this.lastAccess = lastAccess;
  }

  public serialize(): Array<string | number | undefined> {
    return [
      this.query,
      JSON.stringify(this.response),
      this.hitCount,
      this.lastAccess?.toISOString(),
    ];
  }

  public static from(
    row: CacheRow & { response: string; lastAccess: string }
  ): CacheRow {
    return new CacheRow(
      row.query,
      JSON.parse(row.response),
      row.hitCount,
      new Date(row.lastAccess)
    );
  }
}
