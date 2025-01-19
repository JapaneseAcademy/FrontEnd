
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import TeachersPage from './pages/TeachersPage'
import CoursesPage from './pages/CoursesPage'
import QnAPage from './pages/QnAPage'
import MyPage from './pages/MyPage'

function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/teachers" element={<TeachersPage/>} />
        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/qna" element={<QnAPage/>} />
        <Route path="/mypage" element={<MyPage/>} />
      </Routes>
  )
}

export default App
