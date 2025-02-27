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
import StudentsList from './components/adminComponents/Out_StudentsList';
import CoursesList from './components/adminComponents/Out_CoursesList';
import SendMessages from './components/adminComponents/Out_SendMessages';
import ChangeYoutube from './components/adminComponents/Out_ChangeYoutube';
import ChangeHomeBanner from './components/adminComponents/Out_ChangeHomeBanner';
import CourseDetailPage from './pages/CourseDetailPage';
import RegisterPage from './pages/RegisterPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import EditMyPage from './pages/EditMyPage';
import WriteReviewPage from './pages/WriteReviewPage';

function App() {
  const location = useLocation();

  // AdminPage 경로를 포함한 모든 하위 경로에서도 Header와 Footer 숨김
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}
      <Routes>
        {/* 메인 라우트 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/qna" element={<QnAPage />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/review" element={<ReviewDetailPage />} />
        <Route path="/mypage/edit" element={<EditMyPage />}></Route>
        <Route path="/courses/:courseId/writeReview" element={<WriteReviewPage />} />
      

        {/* Admin 라우트 */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="student" element={<StudentsList />} />
          <Route path="message" element={<SendMessages/>} />
          <Route path="course" element={<CoursesList />} />
          <Route path="youtube" element={<ChangeYoutube/>} />
          <Route path="banner" element={<ChangeHomeBanner/>} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingKakaoBtn />}
    </>
  );
}

export default App;
