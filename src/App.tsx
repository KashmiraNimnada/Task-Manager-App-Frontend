import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Task from './pages/Task'
import CreateTask from './pages/CreateTask'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/auth/Signup'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Task />} />
            <Route path="/create" element={<CreateTask />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
