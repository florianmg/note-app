import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, GetNotes } from '@shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    context: {
      createNote: (...args: unknown[]) => CreateNote
      getNotes: () => GetNotes
    }
  }
}
