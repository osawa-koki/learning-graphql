import fs from 'fs'
import path from 'path'

const file = path.join(__dirname, '/db.sqlite3')
if (fs.existsSync(file)) {
  fs.unlinkSync(file)
  console.log('Deleted database file.')
} else {
  console.log('Database file does not exist.')
}