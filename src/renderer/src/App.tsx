import { RootLayout, Content, Sidebar } from '@/components'

import { useEffect, useMemo, useState } from 'react'
import { useNotesStore } from './store/notes.store'
import { cn } from '@/utils/cn'

function App(): JSX.Element {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedNote, setSelectedNote] = useState<number | null>(null)
  const notes = useNotesStore((state) => state.notes)
  const setNotes = useNotesStore((state) => state.setNotes)
  const addNote = useNotesStore((state) => state.addNote)

  const currentNote = useMemo(() => {
    const note = notes.find((n) => n.id === selectedNote)
    return note
  }, [selectedNote, notes])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTitle(e.target.value)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setContent(e.target.value)

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (title.length === 0) return
    const insertedNote = await window.context.createNote?.(title, content)
    addNote(insertedNote)
    setSelectedNote(insertedNote.id)
    setContent('')
    setTitle('')
  }

  useEffect(() => {
    window.context
      .getNotes()
      .then((n) => {
        if (n) setNotes(n)
      })
      .catch((e) => console.log(e))
  }, [window.context])

  return (
    <RootLayout>
      <Sidebar>
        {notes.length !== 0 ? (
          notes.map((n) => (
            <p
              key={n.id}
              onClick={() => setSelectedNote(n.id)}
              className={cn('hover:bg-zinc-500/20 p-2 rounded cursor-pointer', {
                'bg-zinc-500/20': selectedNote === n.id,
              })}
            >
              ({n.id}) - {n.title}
            </p>
          ))
        ) : (
          <p>pas encore de notes</p>
        )}
      </Sidebar>
      <Content className="border-l bg-zinc-900/50 border-l-white/20">
        <form onSubmit={onFormSubmit} className="w-[300px] space-y-1 mx-auto">
          <div>
            <label className="block" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded bg-zinc-800"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label className="block" htmlFor="content">
              Content
            </label>
            <textarea
              className="w-full rounded bg-zinc-800"
              id="content"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <button className="w-full bg-zinc-800 rounded" type="submit">
            Save
          </button>
        </form>
        {currentNote && (
          <div className="bg-zinc-500/20 p-6 mt-6 rounded">
            <p className="font-bold text-xl">{currentNote.title}</p>
            <div>{currentNote.content}</div>
          </div>
        )}
      </Content>
    </RootLayout>
  )
}

export default App
