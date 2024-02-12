import { db } from './db'
import { GetNotes } from '@shared/types'

export const createNote = async (title: string, content: string): Promise<void> => {
  const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)'

  return new Promise((resolve, reject) => {
    db.run(sql, [title, content], (err, row, a) => {
      if (err) {
        reject(err)
      } else {
        console.log('newly created row: ', row, a)
        resolve()
      }
    })
  })
}

export const getNotes = (): GetNotes => {
  const sql = 'SELECT * FROM notes'

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      console.log({ err, rows })
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

// try {
//   const sql = 'SELECT * FROM notes'

//   // Execute the query using a prepared statement for security
//   const [rows] = await db.all(sql)

//   // Convert rows to Note objects if successful
//   // const notes = rows.map((row) => new Note(row[0], row[1], row[2]))
//   return rows
// } catch (err) {
//   console.error('Error retrieving notes:', err)

//   // Consider returning a more meaningful error object or code
//   return null
// } finally {
//   // Ensure the database connection is closed even if an error occurs
//   if (db) {
//     db.close((err) => {
//       if (err) {
//         console.error('Error closing database connection:', err)
//       }
//     })
//   }
// }
// }