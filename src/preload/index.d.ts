import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes } from '@shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    context: {
      createNote: (...args: unknown[]) => Promise<void>
      getNotes: () => GetNotes
    }
  }
}
