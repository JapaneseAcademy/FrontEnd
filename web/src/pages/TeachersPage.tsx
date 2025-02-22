import Main from "../components/Main"
import styled from "styled-components"
import { RiInstagramLine, RiKakaoTalkFill } from "react-icons/ri";

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
      <Main>
      <TeacherBanner src="/images/teacher-introduction-banner.png" alt="Teacher Banner" />

      <Title>
        예리 센세와 소통하고 싶다면?
      </Title>
      <SubTitle>아래를 클릭하세요!</SubTitle>
      <SNSButtons>
        {/* <SNSButton src="/images/snsButtons/kakaotalk1.png" alt="Kakao-Logo" />
        <SNSButton src="/images/snsButtons/instagram.png" alt="Instagram-Logo" /> */}
        <RiKakaoTalkFill size={40} style={{cursor:'pointer'}} onClick={()=>handleSnsClick("kakao")}/>
        <RiInstagramLine size={40} style={{cursor:'pointer'}} onClick={()=>handleSnsClick("instagram")}/>
      </SNSButtons>
      </Main>
    </>
  )
}

export default TeachersPage

const TeacherBanner = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 500;
  margin-top: 40px;
  margin-bottom: 10px;
  color: #ff592f;
  /* color: rgb(234, 111, 80); */
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #333;
`;

const SNSButtons = styled.div`
  display: flex;
  gap: 30px;
  border-radius: 10px;
  padding: 10px 20px;
  /* background-color: #f5f5f5; */
  background-color: rgb(253, 242, 225);
  color: #333;
  justify-content: center;
  align-items: center;

  border: 5px solid #ffffff;

  //그림자
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  /* -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.1);
  -moz-box-shadow: 0 0 5px rgba(0,0,0,0.1); */

  //hover
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

