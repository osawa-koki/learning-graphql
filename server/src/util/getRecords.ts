import sqlite3 from 'sqlite3'
import { DATABASE_FILE_PATH } from '../const'

async function getRecords <T> (sql: string, values?: any[]): Promise<Awaited<T>> {
  const db = new sqlite3.Database(DATABASE_FILE_PATH)
  const res = await new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      db.serialize(async (): Promise<void> => {
        const records = await new Promise((resolve, reject) => {
          db.all(sql, values ?? [], (err, rows) => {
            if (err != null) {
              reject(err)
              return
            }
            resolve(rows)
          })
        })
        db.close()
        resolve(records)
      })
    } catch (err) {
      reject(err)
    }
  })
  return res as Awaited<T>
}

export default getRecords
