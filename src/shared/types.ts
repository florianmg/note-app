export type Note = {
  id: number
  title: string
  content: string
}

export type GetNotes = Promise<Note[] | null>
