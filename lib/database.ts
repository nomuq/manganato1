import * as SQLite from "expo-sqlite";
import { documentDirectory } from "expo-file-system";
import { Manga } from "./models";

export interface History {
  id: number;
  manga_id: string;
  chapter_id: string;
  read_at: string;
}

export interface IHistory {
  manga_id: string;
  chapter_id: string;
  read_at: string;
}

class Database {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase("insigts.db");

    console.log("Database created", `${documentDirectory}SQLite/insigts.db`);
  }

  // singleton instance
  private static instance: Database;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async init() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        manga_id TEXT NOT NULL,
        chapter_id TEXT NOT NULL,
        read_at TEXT NOT NULL
      );
    `);

    // create tables
    // this.runQuery(
    //   `CREATE TABLE IF NOT EXISTS merchants (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT,
    //         refrence TEXT NOT NULL UNIQUE,
    //     )`
    // );
  }

  async insertHistory(history: IHistory) {
    await this.runQuery(
      `INSERT INTO history (manga_id, chapter_id, read_at) VALUES (?, ?, ?)`,
      [history.manga_id, history.chapter_id, history.read_at]
    );
  }

  async getHistory(manga: Manga) {
    const history = await this.runQuery(
      `SELECT * FROM history WHERE manga_id = ?`,
      [manga.id]
    );

    return history.rows._array as History[];
  }

  runQuery(sql: string, args?: (string | number)[] | undefined) {
    return new Promise<any>((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(sql, args, (tx, results) => {
            resolve(results);
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}

export default Database.getInstance();
