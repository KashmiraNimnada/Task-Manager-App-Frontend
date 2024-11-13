import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Task from './pages/Task'
import CreateTask from './pages/CreateTask'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
