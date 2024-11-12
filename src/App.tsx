import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Task from './pages/Task'
import CreateTask from './pages/CreateTask'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
