import Main from "../components/Main"
import styled, { keyframes } from "styled-components"
import { RiInstagramLine, RiKakaoTalkFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";

const TeachersPage = () => {
  const KAKAO_CHANNEL_URL = import.meta.env.VITE_KAKAO_CHANNEL_URL;

  const handleSnsClick = (sns: string) => {
    if (sns === 'kakao') {
      window.open(KAKAO_CHANNEL_URL, "_blank");
    } else if (sns === 'instagram') {
      window.open('https://www.instagram.com/yeri_japanese/');
    }
  }

  return (
    <>
      <Helmet
        title="예리한 일본어 - 선생님 소개"
        meta={[
          {
            name: "description",
            content: "안녕하세요, 예리센세입니다! 저는 주변에 어떠한 혈연도 지연도 없었고, 외국에 나가 산 적도, 교환학생도 가본 적 없지만 일본어로 듣고 말하고 읽고, JLPT 시험도 가볍게 붙어요. 일본어, 센세, 친구, 세 마리 토끼 함께 잡아보실까요! 예리센세니 요우코소~"
          },
        ]}
        link={[{ rel: "canonical", href: "https://www.yeri-jp.com/teachers" }]}
      />
      <Main>
      <TeacherBanner src="/images/teacherBanner/teacher-banner-1.png" alt="Teacher Banner1" />
      <TeacherBanner src="/images/teacherBanner/teacher-banner-2.png" alt="Teacher Banner2" />

      <Title>
        예리 센세와 소통하고 싶다면?
      </Title>
      <SubTitle>아래를 클릭하세요!</SubTitle>
      <SNSButtons>
        {/* <SNSButton src="/images/snsButtons/kakaotalk1.png" alt="Kakao-Logo" />
        <SNSButton src="/images/snsButtons/instagram.png" alt="Instagram-Logo" /> */}
        <RiKakaoTalkFill  style={{cursor:'pointer'}} onClick={()=>handleSnsClick("kakao")}/>
        <RiInstagramLine  style={{cursor:'pointer'}} onClick={()=>handleSnsClick("instagram")}/>
      </SNSButtons>
      </Main>
    </>
  )
}

export default TeachersPage

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

const TeacherBanner = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;

  animation: ${fadeInUp} 0.5s ease-out;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #333;
`;

const SNSButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;
  margin-bottom: 20px;

  //모든 자식들에 대해 적용
  & > * {
    border: 1px solid #e1e1e1;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 10px;
    //그림자
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  } 
`;

