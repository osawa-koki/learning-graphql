import fs from "fs"
import csv from "csv-parse/sync"
import sqlite3 from "sqlite3"
import Prefecture from "../src/@types/Prefecture";

const data = fs.readFileSync(__dirname + '/seeds/prefectures.csv')
const prefectures: Prefecture[] = csv.parse(data, {
  columns: true
});

console.log(prefectures);

const db = new sqlite3.Database(__dirname + '/db.sqlite3')

db.serialize(() => {
  {
    let sql = 'INSERT INTO prefectures(id, name, capital, population, area)'
    const placeholders = prefectures.map((_prefecture) => '(?, ?, ?, ?, ?)').join(',')
    sql += ` VALUES ${placeholders}`
    const values = prefectures.flatMap((prefecture) => [prefecture.id, prefecture.name, prefecture.capital, prefecture.population, prefecture.area])
    db.run(sql, values)
  }
});

db.close();
