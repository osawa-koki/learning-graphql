import sqlite3 from "sqlite3"

async function getRecords <T> (dbPath: string, sql: string): Promise<Awaited<T>> {
  const db = new sqlite3.Database(dbPath)
  const res = await new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        const records = await new Promise((resolve, reject) => {
          db.all(sql, (err, rows) => {
            if (err != null) {
              reject(err)
              return
            }
            resolve(rows)
          })
        })
        db.close();
        resolve(records)
      })
    } catch (err) {
      reject(err)
    }
  })
  return res as Awaited<T>
}

export default getRecords
