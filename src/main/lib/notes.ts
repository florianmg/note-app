import { db } from './db'
import { GetNotes, CreateNote } from '@shared/types'

export const createNote: CreateNote = ({ title, content }) =>
  new Promise((resolve, reject) => {
    try {
      // Prepare the query to insert a new note
      const insertNoteQuery = 'INSERT INTO notes (title, content) VALUES (?, ?)'

      // Execute the query with the provided title and content
      const info = db.prepare(insertNoteQuery).run(title, content)

      // Return the ID of the newly inserted note
      resolve({ id: info.lastInsertRowid, title, content })
    } catch (error) {
      console.log('error while creating new note: ', error)
      reject(null)
    } finally {
      // Close the database connection
      // db.close()
    }
  })

export const getNotes: GetNotes = () =>
  new Promise((resolve, reject) => {
    try {
      // Prepare the query to select all entries from the notes table
      const selectAllQuery = 'SELECT * FROM notes'

      // Execute the query and get all rows
      const notes = db.prepare(selectAllQuery).all()
      resolve(notes)
    } catch (error) {
      console.log('error while fetching all notes', error)
      reject(null)
    } finally {
      // Close the database connection
      // db.close()
    }
  })
