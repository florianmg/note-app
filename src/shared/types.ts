export type Note = {
  id: number
  title: string
  content: string
}

export type GetNotes = () => Promise<Note[] | null>
export type CreateNote = (params: { title: string; content: string }) => Promise<Note | null>
