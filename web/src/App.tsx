
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import TeachersPage from './pages/TeachersPage'
import CoursesPage from './pages/CoursesPage'
import NoticePage from './pages/NoticePage'
import QnAPage from './pages/QnAPage'

function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/teachers" element={<TeachersPage/>} />
        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/notice" element={<NoticePage/>} />
        <Route path="/qna" element={<QnAPage/>} />
      </Routes>
  )
}

export default App
