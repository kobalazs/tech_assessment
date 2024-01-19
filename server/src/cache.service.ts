import { CacheRow, SearchMovieResponse } from "../../models/index.js";
import sqlite3 from "sqlite3";

sqlite3.verbose();

export class CacheService {
  private _db: sqlite3.Database;

  public constructor() {
    this._db = new sqlite3.Database(":memory:");
    this._db.run(
      "CREATE TABLE IF NOT EXISTS movies (query TEXT, response TEXT, hitCount INTEGER DEFAULT 0, lastAccess DATETIME DEFAULT CURRENT_TIMESTAMP)"
    );
  }

  public set(query: string, response: SearchMovieResponse): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.serialize(() => {
        try {
          const row = new CacheRow(query, response);
          const stmt = this._db.prepare(
            "INSERT INTO movies VALUES (?, ?, ?, ?)"
          );
          stmt.run(...row.serialize());
          stmt.finalize();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public get(query: string): Promise<SearchMovieResponse> {
    return new Promise((resolve, reject) => {
      this._db.all(
        "SELECT * FROM movies WHERE query = ?",
        query,
        (err: Error, rows: { response: string }) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(rows[0] ? CacheRow.from(rows[0]).response : undefined);
        }
      );
    });
  }

  public close(): void {
    this._db.close();
  }
}
