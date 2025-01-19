import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import styled from 'styled-components' 
import { FcConferenceCall } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { FcInfo } from "react-icons/fc";
import { FcHeadset } from "react-icons/fc";

const HomePage = () => {
  const navigate = useNavigate();

  return (
   <>
      <Header />
      <Main>
        <HomeBanner>
          <ProfileImage src='/images/ProfileImageEx.jpeg' />
          <Description>
            <UpDescription>
              <span style={{fontSize:'12px', fontWeight:'400', color:'#a0a0a0', fontFamily:'Pretendard-regular', paddingBottom:'10px'}}>어쩌구 저쩌구</span>
              <span style={{fontSize:'25px'}}>어쩌구 저쩌구! <br/> 어쩌구 저쩌구 오예</span>
            </UpDescription>
            <DownDescription>
              - 가나다라마 바사
              <br/>
              - 아자차 카타파하
              <br/>
              - 아무말 아무말 렐렐레
            </DownDescription>
          </Description>
        </HomeBanner>
        <CardsContainer>
          <Card id='teachersCard' onClick={ () => navigate(`/teachers`)}> 
            <FcConferenceCall size={70} />
            <span>선생님 소개</span>
            </Card>
          <Card id='coursesCard' onClick={ () => navigate(`/courses`)}>
           <FcViewDetails size={70}/>
            <span>강좌 목록</span>
          </Card>
          <Card id='qnaCard' onClick={ () => navigate(`/qna`)}>
            <FcHeadset size={70} />
            <span>Q&A</span>
          </Card>
          <Card id='myPageCard' onClick={ () => navigate(`/mypage`)}>
            <FcInfo size={70} />
            <span>마이 페이지</span>
          </Card>
        </CardsContainer>
      </Main>
      <Footer />
    </>
  )
}

export default HomePage

const HomeBanner = styled.div`
  width: 100%;
  height: 270px;
  background-color: #efdecb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;

  /* 배경 이미지 삽입 */
  /* background-image: url('/images/1.jpg');
  background-size: cover;
  background-position: center; 
  background-blend-mode: overlay; 
  background-color: rgba(0, 0, 0, 0.3); */

  font-family: 'SF_HambakSnow';
  color: #392a20;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #f8f8f8;
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
  font-family: 'Pretendard-regular';
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 고정 */
  gap: 20px; /* 카드 간격 */
  width: 100%;
  max-width: 500px; /* 카드 컨테이너의 최대 너비 */
  padding: 50px;
  justify-content: center;
`;

const Card = styled.div`
  cursor: pointer;
  height: 100%;
  aspect-ratio: 1/1; /* 가로세로 비율 1:1 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 20px;
  gap: 15px;
  font-family: 'TTBookendBatangR';
  font-weight: 700;
  /* border: 1px solid #c6c6c6; */

  /* 그림자 추가 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1), /* 일반 그림자 */
              0 1px 3px rgba(0, 0, 0, 0.06); /* 가벼운 그림자 */

  /* 호버 시 그림자 강조 */
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 호버 상태에서 더 강한 그림자 */
  }
`;
