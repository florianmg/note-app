import { app } from 'electron'
import path from 'path'
import Database from 'better-sqlite3'

const dbName = 'noteapp.db'
const dbRoot = import.meta.env.DEV ? '' : app.getPath('userData')
const dbPath = path.join(dbRoot, dbName)
const db = new Database(dbPath, {})

db.pragma('journal_mode = WAL')

// TODO: Check database version and update if necessary
const initDatabase = (): void => {
  console.log('initiDatabase at :', dbPath)
  try {
    const createNotesTableQuery =
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)'

    db.exec(createNotesTableQuery)
  } catch (error) {
    console.log('error while initializing database', error)
  }
}

export { db, initDatabase }
