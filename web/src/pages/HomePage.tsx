import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import styled from 'styled-components' 
import { PiChalkboardTeacherLight } from "react-icons/pi"; 
import { FcConferenceCall } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { FcDecision } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
   <>
      <Header />
      <Main>
        <HomeBanner>세계 최고의 <br/> 일본어 학원</HomeBanner>
        <CardsContainer>
          <Card id='teachersCard' onClick={ () => navigate(`/teachers`)}> 
            <FcConferenceCall size={70} />
            <span>강사진</span>
            </Card>
          <Card id='coursesCard' onClick={ () => navigate(`/courses`)}>
           <FcViewDetails size={70}/>
            <span>강좌 목록</span>
          </Card>
          <Card id='noticeCard' onClick={ () => navigate(`/notice`)}>
            <FcAdvertising size={70} />
            <span>공지사항</span>
          </Card>
          <Card id='qnaCard' onClick={ () => navigate(`/qna`)}>
            <FcDecision size={70} />
            <span>Q&A</span>
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
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  background-image: url('/images/1.jpg');
  background-size: cover; /* 이미지가 컨테이너를 채우도록 설정 */
  background-position: center; /* 이미지를 중앙에 배치 */
  background-blend-mode: overlay; /* 이미지 위에 배경색 블렌딩 */
  background-color: rgba(0, 0, 0, 0.3); /* 배경색을 흰색으로 설정 */

  font-family: 'SF_HambakSnow';
  color: #392a20;
  font-size: 40px;
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
