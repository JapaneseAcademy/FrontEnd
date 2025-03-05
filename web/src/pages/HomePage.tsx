import Main from '../components/Main'
import styled, {keyframes} from 'styled-components' 
import { useNavigate } from 'react-router-dom';
import Youtube from '../components/Youtube';
import { useEffect } from 'react';
import { login } from '../apis/loginAPI';
import DownCourses from '../components/mainPage/DownCourses';
import DownReviews from '../components/mainPage/DownReviews';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // window.scrollTo(0, 0); // 화면 맨 위로 이동 -> 나중에 개발 다 하고 활성화
    
    // 카카오에서 code 받아온 후의 처리
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    console.log('code:', code);
    // code가 있고, localStorage에 토큰이 없으면 로그인 요청
    if (code && !localStorage.getItem('accessToken')) {
      login(code, navigate);
    }
  }, );


  return (
  <>
      <Main>
        <MainBanner src='/images/main-banner.png' />

        <Ment>
          <span style={{fontSize:'16px', fontWeight:'400'}}>
            일본어 공부가 힘들다면</span>
          <span style={{fontSize:'18px'}}>
            <span style={{fontSize:'20px', textDecoration:'underline', fontWeight: 'bold'}}>예리 센세</span>와 함께 하세요!</span>
        </Ment>

        <Youtube />

        <ReviewsContainer>
          <UpReview>
            <Title>수강 후기</Title>
          </UpReview>
          <DownReviews />
        </ReviewsContainer>

        <CoursesContainer>
          <UpCourses>
            <Title>강좌 목록</Title>
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
  object-fit: cover;
  margin-bottom: 30px;
  margin-top: 30px;

  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.8s ease-out;
`;



const Ment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  background-color: #ffffff;
  font-family: 'Pretendard';
  gap: 5px;
  margin-bottom: 30px;

  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.8s ease-out;
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
