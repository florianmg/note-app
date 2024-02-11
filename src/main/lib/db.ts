import { app } from 'electron'
import path from 'path'

const dbName = 'noteapp.db'
const dbPath = path.join(app.getPath('userData'), dbName)

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbPath)

const initDatabase = (): void => {
  console.log('initiDatabase at :', dbPath)
  // TODO: Check database version and update if necessary
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)')
  })
}

export { db, initDatabase }
