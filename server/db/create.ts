import sqlite3 from 'sqlite3'
import { DATABASE_FILE_PATH } from '../src/const'

const db = new sqlite3.Database(DATABASE_FILE_PATH)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS prefectures(
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      capital TEXT NOT NULL,
      population INTEGER NOT NULL,
      area REAL NOT NULL
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS cities(
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      prefecture_id INTEGER NOT NULL,
      population INTEGER NOT NULL,
      area REAL NOT NULL
    )
  `)
})

db.close()
