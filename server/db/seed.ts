import fs from 'fs'
import csv from 'csv-parse/sync'
import sqlite3 from 'sqlite3'
import path from 'path'
import { DATABASE_FILE_PATH } from '../src/const'
import { type Prefecture } from '../src/@types/graphql'

const prefectures: Prefecture[] = csv.parse(fs.readFileSync(path.join(__dirname, './seeds/prefectures.csv')), {
  columns: true
})

const db = new sqlite3.Database(DATABASE_FILE_PATH)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
db.serialize(async (): Promise<void> => {
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
  db.close()
})
