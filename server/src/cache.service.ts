import { CacheRecord, TMDBResponse } from "../../models/index.js";
import sqlite3 from "sqlite3";

sqlite3.verbose();

export class CacheService {
  private _db: sqlite3.Database;

  public constructor() {
    this._db = new sqlite3.Database(":memory:");
    this._db.run(
      "CREATE TABLE IF NOT EXISTS search_events (query TEXT PRIMARY KEY ON CONFLICT REPLACE, response TEXT, hitCount INTEGER DEFAULT 0, lastAccess TIMESTAMP)"
    );
  }

  public set(searchEvent: CacheRecord): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.serialize(() => {
        try {
          const stmt = this._db.prepare(
            "INSERT INTO search_events VALUES (?, ?, ?, ?)"
          );
          stmt.run(...searchEvent.serialize());
          stmt.finalize();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public get(query: string): Promise<CacheRecord> {
    return new Promise((resolve, reject) => {
      this._db.all(
        "SELECT * FROM search_events WHERE query = ?",
        query,
        (err: Error, rows: { response: string }) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(rows[0] ? CacheRecord.from(rows[0]) : undefined);
        }
      );
    });
  }

  public close(): void {
    this._db.close();
  }
}
