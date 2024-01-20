import { TMDBResponse } from "./tmdb-response.js";

export class CacheRecord {
  public query: string;
  public response: TMDBResponse;
  public hitCount?: number;
  public lastAccess?: Date;

  public constructor(
    query: string,
    response: TMDBResponse,
    hitCount?: number,
    lastAccess?: Date
  ) {
    this.query = query;
    this.response = response;
    this.hitCount = hitCount;
    this.lastAccess = lastAccess;
  }

  public hadAccessWithinMinutes(thresholdMinutes: number): boolean {
    return (
      this.lastAccess === undefined ||
      this.lastAccess.getTime() > Date.now() - thresholdMinutes * 60 * 1000
    );
  }

  public serialize(): Array<string | number | undefined> {
    return [
      this.query,
      JSON.stringify(this.response),
      this.hitCount,
      new Date().toISOString(),
    ];
  }

  public static from(
    row: CacheRecord & { response: string; lastAccess: string }
  ): CacheRecord {
    return new CacheRecord(
      row.query,
      JSON.parse(row.response),
      row.hitCount,
      new Date(row.lastAccess)
    );
  }
}
