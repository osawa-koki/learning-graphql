import fs from 'fs'
import csv from 'csv-parse/sync'
import sqlite3 from 'sqlite3'
import path from 'path'
import type Prefecture from '../src/@types/prefecture'
import type City from '../src/@types/city'

const prefectures: Prefecture[] = csv.parse(fs.readFileSync(path.join(__dirname, '/seeds/cities.csv')), {
  columns: true
})
const cities: City[] = csv.parse(fs.readFileSync(path.join(__dirname, '/seeds/cities.csv')), {
  columns: true
})

const db = new sqlite3.Database(path.join(__dirname, '/db.sqlite3'))

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
  db.close()
})
