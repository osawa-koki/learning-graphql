import fs from "fs"
import csv from "csv-parse/sync"
import sqlite3 from "sqlite3"
import Prefecture from "../src/@types/prefecture";
import City from "../src/@types/city";

const prefectures: Prefecture[] = csv.parse(fs.readFileSync(__dirname + '/seeds/prefectures.csv'), {
  columns: true
});
const cities: City[] = csv.parse(fs.readFileSync(__dirname + '/seeds/cities.csv'), {
  columns: true
});

const db = new sqlite3.Database(__dirname + '/db.sqlite3')

db.serialize(async () => {
  {
    // let sql = 'INSERT INTO prefectures(id, name, capital, population, area)'
    // const placeholders = prefectures.map((_prefecture) => '(?, ?, ?, ?, ?)').join(',')
    // sql += ` VALUES ${placeholders}`
    // const values = prefectures.flatMap((prefecture) => [prefecture.id, prefecture.name, prefecture.capital, prefecture.population, prefecture.area])
    // db.run(sql, values)

    for (const prefecture of prefectures) {
      await new Promise((resolve, reject) => {
        db.get('SELECT * FROM prefectures WHERE id = ?', prefecture.id, (err, row) => {
          if (err != null) {
            reject(err)
            return
          }
          if (row != null) {
            db.run('UPDATE prefectures SET name = ?, capital = ?, population = ?, area = ? WHERE id = ?', prefecture.name, prefecture.capital, prefecture.population, prefecture.area, prefecture.id)
          } else {
            db.run('INSERT INTO prefectures(id, name, capital, population, area) VALUES (?, ?, ?, ?, ?)', prefecture.id, prefecture.name, prefecture.capital, prefecture.population, prefecture.area)
          }
          resolve({})
        })
      })
    }
  }
  {
    for (const city of cities) {
      await new Promise((resolve, reject) => {
        db.get('SELECT * FROM cities WHERE id = ?', city.id, (err, row) => {
          if (err != null) {
            reject(err)
            return
          }
          if (row != null) {
            db.run('UPDATE cities SET name = ?, prefecture_id = ?, population = ?, area = ? WHERE id = ?', city.name, city.prefecture_id, city.population, city.area, city.id)
          } else {
            db.run('INSERT INTO cities(id, name, prefecture_id, population, area) VALUES (?, ?, ?, ?, ?)', city.id, city.name, city.prefecture_id, city.population, city.area)
          }
          resolve({})
        })
      })
    }
  }
  db.close();
});
