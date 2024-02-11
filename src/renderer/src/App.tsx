import { RootLayout, Content, Sidebar } from '@/components'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <RootLayout>
      <Sidebar>Sidebar</Sidebar>
      <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
    </RootLayout>
  )
}

export default App
