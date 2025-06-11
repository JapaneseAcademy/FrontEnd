import Main from '../components/Main'
import styled, {keyframes} from 'styled-components' 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '../apis/loginAPI';
import DownCourses from '../components/mainPage/DownCourses';
import DownReviews from '../components/mainPage/DownReviews';
import { loadingAtom } from '../recoil/loadingAtom';
import { useSetRecoilState } from 'recoil';
import { Helmet } from 'react-helmet-async';
import MainYoutube from '../components/MainYoutube';
import Loading from '../components/Loading';

const HomePage = () => {
  const [isMainBannerLoaded, setIsMainBannerLoaded] = useState<boolean>(false);
  const setIsLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); 
    
    // 카카오에서 code 받아온 후의 처리
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    // code가 있고, localStorage에 토큰이 없으면 로그인 요청
    if (code && !localStorage.getItem('accessToken')) {
      login(code, navigate, setIsLoading);
    }
  }, );


  return (
  <>
      <Helmet>
        <title>예리한 일본어</title>
        <link rel="canonical" href="https://www.yeri-jp.com/" />
        <meta name="description" content="예리한 일본어에서는 유학 없이도 원어민처럼 일본어를 배울 수 있습니다. 대화로 배우는 살아있는 일본어, 예리한 일본어에서 온·오프라인 전세계 어디서든 시작하세요!" />
      </Helmet>

      {/* 이미지 로드가 완료될 때까지 로딩 화면 표시 */}
      {!isMainBannerLoaded && 
        <Loading/>
        }

      <Main>
        <MainBanner src='/images/main-banner.png' alt='main-banner' onLoad={() => setIsMainBannerLoaded(true)}/>

        <Ment>
          <span style={{fontSize:'16px', fontWeight:'400', marginBottom:'10px'}}>
            유학 없이도 원어민처럼!</span>
          <span style={{fontSize:'18px'}}>
            대화로 배우는 살아있는 일본어,<br/>
            <span style={{fontSize:'20px', textDecoration:'underline', fontWeight: 'bold'}}>예리한 일본어</span>에서 온·오프라인 전세계 어디서든 시작하세요!
          </span>
        </Ment>

        <MainYoutube />

        <ReviewsContainer>
          <UpReview>
            <Title>수강 후기</Title>
            <MoreButton onClick={ () => navigate(`/reviews?page=1`)}>더보기 &gt;</MoreButton>
          </UpReview>
          <DownReviews />
        </ReviewsContainer>

        <CoursesContainer>
          <UpCourses>
            <Title>강의 목록</Title>
            <MoreButton onClick={ () => navigate(`/courses`)}>더보기 &gt;</MoreButton>
          </UpCourses>
          <DownCourses />
        </CoursesContainer>
      </Main>
    </>
  )
}

export default HomePage

/* 아래에서 위로 올라오는 애니메이션 정의(재사용 가능) */
const fadeInUp = keyframes`
  from {
    transform: translateY(20px); /* 아래에서 시작 */
    opacity: 0; /* 투명하게 시작 */
  }
  to {
    transform: translateY(0); /* 제자리로 */
    opacity: 1; /* 완전히 표시 */
  }
`;

const MainBanner = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  margin-bottom: 30px;
  margin-top: 30px;

  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.5s ease-out;
`;



const Ment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 20px;
  background-color: #ffffff;
  font-family: 'Pretendard';
  gap: 5px;
  margin-bottom: 30px;

  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.5s ease-out;
`;



const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background-color: #f8f8f8;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  gap: 15px;
  margin-bottom: 40px;
`;

const UpReview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const MoreButton = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #a0a0a0;
  cursor: pointer;
`;


const CoursesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background-color: #f8f8f8;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  gap: 15px;
  margin-bottom: 40px;
`;

const UpCourses = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

