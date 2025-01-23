import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import CoursesPage from './pages/CoursesPage';
import QnAPage from './pages/QnAPage';
import MyPage from './pages/MyPage';
import IntroductionPage from './pages/IntroductionPage';
import TestPage from './pages/TestPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingKakaoBtn from './components/FloatingKakaoBtn';
import AdminPage from './pages/AdminPage';

function App() {
  const location = useLocation(); // 현재 경로 가져오기

  // AdminPage일 때 Header와 Footer를 숨김
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {!isAdminPage && <Header />} {/* Header 조건부 렌더링 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/qna" element={<QnAPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/introduction" element={<IntroductionPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<div>Not Found</div>} />

        <Route path="/test" element={<TestPage />} />
      </Routes>
      {!isAdminPage && <Footer />} {/* Footer 조건부 렌더링 */}
      {!isAdminPage && <FloatingKakaoBtn />} {/* FloatingKakaoBtn도 조건부 렌더링 */}
    </>
  );
}

export default App;
