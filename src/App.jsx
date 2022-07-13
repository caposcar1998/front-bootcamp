import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import NoPage from './pages/NoPage'
import Users from './pages/Users'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
          <Route path='users' element={<Users />} />
          <Route path='*' element={<NoPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
