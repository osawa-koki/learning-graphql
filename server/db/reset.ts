import fs from 'fs'
import { DATABASE_FILE_PATH } from '../src/const'

const file = DATABASE_FILE_PATH
if (fs.existsSync(file)) {
  fs.unlinkSync(file)
  console.log('Deleted database file.')
} else {
  console.log('Database file does not exist.')
}
