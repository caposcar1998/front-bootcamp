import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, User, Users, NoPage } from 'pages'
import { Layout } from 'components'

function App() {
  const loggedUser = sessionStorage.getItem('loggedUser')

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedUser ? <Users /> : <Login />} />
            <Route path="user" element={loggedUser ? <User /> : <NoPage />} />
            <Route path="users" element={loggedUser ? <Users /> : <NoPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  )
}

export default App
