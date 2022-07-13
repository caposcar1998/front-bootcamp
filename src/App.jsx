import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, User, NoPage } from 'pages'
import { Layout } from 'components'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="users" element={<User />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  )
}

export default App
