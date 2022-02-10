import sqlite, { sqlite3 } from 'sqlite3';
const sql: sqlite3 = sqlite.verbose();
const db = new sql.Database('./db/simple.sqlite');

export default db;
