import { RootLayout, Content, Sidebar } from '@/components'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <RootLayout>
      <Sidebar className="p-2 border-4 border-yellow-500">Sidebar</Sidebar>
      <Content className="p-2 border-4 border-pink-500">Content</Content>
    </RootLayout>
  )
}

export default App
