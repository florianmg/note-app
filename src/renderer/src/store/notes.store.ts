import { create } from 'zustand'
import { Note } from '@shared/types'

type NoteStore = {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
}

export const useNotesStore = create<NoteStore>((set) => ({
  notes: [],
  setNotes: (notes: Note[]): void => set({ notes }),
  addNote: (note: Note): void => set((state) => ({ notes: [...state.notes, note] })),
}))
