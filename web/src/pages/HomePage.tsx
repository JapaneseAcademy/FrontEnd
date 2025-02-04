import Main from '../components/Main'
import styled, {keyframes} from 'styled-components' 
import { useNavigate } from 'react-router-dom';
import Youtube from '../components/Youtube';
import { useEffect } from 'react';
import { login } from '../apis/loginAPI';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // window.scrollTo(0, 0); // 화면 맨 위로 이동 -> 나중에 개발 다 하고 활성화
    
    // 카카오에서 code 받아온 후의 처리
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    console.log('code:', code);
    // code가 있고, localStorage에 토큰이 없으면 로그인 요청
    if (code && !localStorage.getItem('token')) {
      login(code);
    }
  }
  , []);

  return (
  <>
      <Main>
        <MainBanner src='/images/main-banner.png' />
        {/* <HomeBanner>
          <ProfileImage src='/images/yeri/profile1.png' />
          <Description>
            <UpDescription>
              <span style={{fontSize:'12px', fontWeight:'400', color:'#a0a0a0', paddingBottom:'10px'}}>지금까지 이런 센세는 없었다</span>
              <span style={{fontSize:'22px', fontWeight:'800',  fontFamily: 'SF_HambakSnow'}}>국내파 멀티링구얼 <br/> '진짜 학습자'!</span>
            </UpDescription>
            <DownDescription>
              - 가나다라마 바사
              <br/>
              - 아자차 카타파하
              <br/>
              - 아무말 아무말 렐렐레
            </DownDescription>
          </Description>
        </HomeBanner> */}

        <Ment>
          <span style={{fontSize:'16px', fontWeight:'400'}}>
            일본어 공부가 힘들다면</span>
          <span style={{fontSize:'18px'}}>
            <span style={{fontSize:'20px', textDecoration:'underline', fontWeight: 'bold'}}>예리 센세</span>와 함께 하세요!</span>
        </Ment>
{/* 
        <Banner>
          <div>지금까지 이런 센세는 없었다</div>
          <div>국내파 멀티링구얼 <br/> '진짜 학습자'!</div>
        </Banner> */}

        <Youtube />

        <ReviewsContainer>
          <UpReview>
            <Title>수강 후기</Title>
            <MoreButton onClick={ () => navigate(`/reviews`)}>더보기 &gt;</MoreButton>
          </UpReview>
          <DownReview>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>기초 일본어 초급반</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>수강 과목</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>수강 과목</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>수강 과목</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>수강 과목</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'1500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
            <ReviewCard>
              <span id='review_course' style={{fontSize:'14px', borderBottom:'1px solid #e2e2e2', paddingBottom:'5px'}}>수강 과목</span>
              <span id='review_title' style={{fontSize:'16px', fontWeight:'1500'}}>수강후기입니다.</span>
              <span id='review_content' style={{fontSize:'14px'}}>안녕하세요^^ 너무 잘 가르쳐주세요. 완전 짱입니다! 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ 단기간에 일본어 전문가가 됐어요 ㅎㅎ</span>
              <span id='review_id' style={{fontSize:'12px', color:'#a0a0a0'}}>japane***</span>
            </ReviewCard>
          </DownReview>
        </ReviewsContainer>

        <CoursesContainer>
          <UpCourses>
            <Title>강좌 목록</Title>
            <MoreButton onClick={ () => navigate(`/courses`)}>더보기 &gt;</MoreButton>
          </UpCourses>
          <DownCourses>
            <CourseCard>
              <CourseImage src='/images/courseBanner/courseBanner1.png' />
              <TagContainer>
                <Tag>실시간</Tag>
                <Tag>자체교재</Tag>
              </TagContainer>
              <span id='course_title' style={{fontSize:'16px', fontWeight:'500'}}>예리한 기초 일본어 1코스</span>
              <span id='course_description' style={{fontSize:'12px', color:'#a0a0a0'}}>기초를 탄탄히 하자!</span>
              <span id='course_price' style={{fontSize:'14px', fontWeight:'600', marginTop:'5px'}}>100,000 원</span>
            </CourseCard>
            <CourseCard>
              <CourseImage src='/images/courseBanner/courseBanner1.png' />
              <TagContainer>
                <Tag>현강</Tag>
                <Tag>자체교재</Tag>
              </TagContainer>
              <span id='course_title' style={{fontSize:'16px', fontWeight:'500'}}>예리한 기초 일본어 1코스</span>
              <span id='course_description' style={{fontSize:'12px', color:'#a0a0a0'}}>기초를 탄탄히 하자!</span>
              <span id='course_price' style={{fontSize:'14px', fontWeight:'600', marginTop:'5px'}}>100,000 원</span>
            </CourseCard>
            <CourseCard>
              <CourseImage src='/images/courseBanner/courseBanner1.png' />
              <TagContainer>
                <Tag>동영상</Tag>
                <Tag>자체교재</Tag>
              </TagContainer>
              <span id='course_title' style={{fontSize:'16px', fontWeight:'500'}}>예리한 기초 일본어 1코스</span>
              <span id='course_description' style={{fontSize:'12px', color:'#a0a0a0'}}>기초를 탄탄히 하자!</span>
              <span id='course_price' style={{fontSize:'14px', fontWeight:'600', marginTop:'5px'}}>100,000 원</span>
            </CourseCard>
          </DownCourses>
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
  margin-top: 20px;

  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.8s ease-out;
`;

const HomeBanner = styled.div`
  width: 100%;
  height: 270px;
  background-color: #efdecb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;

  /* 배경 이미지 삽입 */
  /* background-image: url('/images/1.jpg');
  background-size: cover;
  background-position: center; 
  background-blend-mode: overlay; 
  background-color: rgba(0, 0, 0, 0.3); */

  color: #392a20;

  animation: ${fadeInUp} 0.8s ease-out;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f8f8;
  background-color: #f8f8f8;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
`;

const UpDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const DownDescription = styled.div`
  font-size: 10px;
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

const DownReview = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* 줄바꿈 방지 */
  overflow-x: auto; /* 가로 스크롤 활성화 */
  gap: 20px; /* 카드 간 간격 */
  padding-bottom: 10px;

  /* 스크롤바 스타일 (선택 사항) */
  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c6c6c6; /* 스크롤바 색상 */
    border-radius: 4px; /* 둥근 모서리 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 스크롤바 배경 */
  }
`;

const ReviewCard = styled.div`
  width: 300px; /* 고정 너비 */
  height: 200px; /* 고정 높이 */
  flex-shrink: 0; /* 너비가 줄어들지 않도록 설정 */
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  gap: 10px;

  #review_content {
    font-size: 14px;
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    display: -webkit-box; /* Flexbox와 비슷한 WebKit 기반 레이아웃 */
    -webkit-line-clamp: 3; /* 최대 3줄까지만 표시 */
    -webkit-box-orient: vertical; /* 블록 방향으로 텍스트 정렬 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 "..." 처리 */
    line-height: 1.5; /* 줄 간격 조정 */
    max-height: calc(1.5em * 3); /* 3줄 높이 제한 */
  }
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

const DownCourses = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* 줄바꿈 방지 */
  overflow-x: auto; /* 가로 스크롤 활성화 */
  gap: 20px; /* 카드 간 간격 */
  padding-bottom: 10px;

  /* 스크롤바 스타일 (선택 사항) */
  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c6c6c6; /* 스크롤바 색상 */
    border-radius: 4px; /* 둥근 모서리 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 스크롤바 배경 */
  }

`;


const CourseCard = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  width: 300px; /* 고정 너비 */

  flex-shrink: 0; /* 너비가 줄어들지 않도록 설정 */
  /* border: 1px solid #e2e2e2;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  gap: 10px; */
`;

const CourseImage = styled.img`
  width: 100%;
  /* height: 200px; */
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 7px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
`;
const Tag = styled.div`
  padding: 4px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background-color: #2a2a2a;
  border-radius: 5px;
`;


////////////////////////////////////////

// const Banner = styled.div`
//   width: 100%;
//   height: 200px;
//   background-color: #392a20;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-size: 20px;
//   font-weight: 600;
//   margin-bottom: 30px;
//   animation: ${fadeInUp} 0.8s ease-out;
// `;

