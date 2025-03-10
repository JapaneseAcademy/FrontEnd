import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components'; // ✅ styled-components 추가
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
import CourseDetailPage from './pages/CourseDetailPage';
import RegisterPage from './pages/RegisterPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import EditMyPage from './pages/EditMyPage';
import WriteReviewPage from './pages/WriteReviewPage';
import Out_MainBestReviews from './components/adminComponents/Out_BestReviews';
import { useRecoilState } from 'recoil';
import { loadingAtom } from './recoil/loadingAtom';
import Loading from './components/Loading';
import AdminLoginPage from './pages/AdminLoginPage';
import Out_StudentsList from './components/adminComponents/Out_StudentsList';
import Out_SendMessages from './components/adminComponents/Out_SendMessages';
import Out_ChangeYoutube from './components/adminComponents/Out_ChangeYoutube';
import Out_CourseInfoList from './components/adminComponents/Out_CourseInfoList';
import Out_TimeTables from './components/adminComponents/Out_TimeTableList';
import ReviewsPage from './pages/ReviewsPage';
import PaymentPage from './pages/payment/PaymentPage';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFailure from './pages/payment/PaymentFailure';
import PaymentLoading from './pages/payment/PaymentLoading';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [isLoading] = useRecoilState(loadingAtom);

  // ✅ 로딩 중이면 전체 앱 대신 로딩 화면을 렌더링
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isAdminPage && <Header />}

      {/* ✅ Admin 페이지가 아닐 때만 AppWrapper 적용 */}
      {isAdminPage ? (
        <Routes>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="student" element={<Out_StudentsList />} />
            <Route path="message" element={<Out_SendMessages />} />
            <Route path="courseInfo" element={<Out_CourseInfoList />} />
            <Route path="timetables" element={<Out_TimeTables />} />
            <Route path="mainReviews" element={<Out_MainBestReviews />} />
            <Route path="youtube" element={<Out_ChangeYoutube />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
      ) : (
        <AppWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/qna" element={<QnAPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/courses/:courseInfoId" element={<CourseDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/review" element={<ReviewDetailPage />} />
            <Route path="/mypage/edit" element={<EditMyPage />} />
            <Route path="/writeReview" element={<WriteReviewPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
            <Route path="/payment/loading" element={<PaymentLoading />} />
          </Routes>
          {/* ✅ Footer와 FloatingKakaoBtn을 AppWrapper 내부에 배치하여 크기 조정 */}
          <Footer />
          <FloatingKakaoBtn />
        </AppWrapper>
      )}
    </>
  );
}

export default App;

// ✅ 중앙 정렬 & 최대 너비 설정
const AppWrapper = styled.div`
  width: 100%;
  max-width: 480px; /* 모바일 크기 고정 */
  margin: 0 auto; /* 가운데 정렬 */
  min-height: 100vh; /* 최소 높이 설정 */
  background-color: #ffffff; /* 필요하면 배경색 설정 */
  
  @media (max-width: 480px) {
    width: 100%; /* 모바일에서는 100% 사용 */
  }
`;
