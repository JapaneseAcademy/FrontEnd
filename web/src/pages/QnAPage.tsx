import Main from '../components/Main'
import styled from 'styled-components'

const QnAPage = () => {
  // const KAKAO_CHANNEL_URL = import.meta.env.VITE_KAKAO_CHANNEL_URL;

  // const handleKakaoBtnClick = () => {
  //   window.open(KAKAO_CHANNEL_URL, "_blank");
  // }

  return (
    <>
      <Main>
        <Banner>
          {/* <BannerImage src='images/hiragana.png'/> */}
          <BannerText>
            올림피아드를 거친 수많은 
            <br/>
            학생의 데이터를 기반으로
            <br/>
            <span style={{fontWeight:'650'}}>AI가 체계적으로 </span>비교 분석합니다. 
            <br/>             <br/>
            수강생의 실력과 특성을 
            <br/> 
            세심하게 파악한 후 
            <br/> 
            수준에 맞는 클럽과 반을
            <br/> 
            배정합니다. 
          </BannerText>
        </Banner>

        <Line/>

        <Content>
          <ContentTitle>자주 묻는 질문</ContentTitle>
          <ContentText>
            <span style={{fontWeight:'bold'}}>Q. 수강료는 얼마인가요?</span>
            <br/>
            A. 수강료는 1회당 100,000원입니다.
            <br/>
            <br/>
            <span style={{fontWeight:'bold'}}>Q. 수업 시간은 어떻게 되나요?</span>
            <br/>
            A. 수업 시간은 매주 토요일 10:00~12:00입니다.
            <br/>
            <br/>
            <span style={{fontWeight:'bold'}}>Q. 수업 장소는 어디인가요?</span>
            <br/>
            A. 수업 장소는 서울시 강남구 역삼동 123-456번지 1층입니다.
            <br/>
            <br/>
            <span style={{fontWeight:'bold'}}>Q. 수업은 어떤 내용으로 진행되나요?</span>
            <br/>
            A. 수업은 기초부터 차근차근 진행되며, 수준에 따라 맞춤형 수업이 진행됩니다.
            </ContentText>
        </Content>
      </Main>
  </>
  )
}

export default QnAPage

const Banner = styled.div`
  width: 100%;
  background-image: url('/images/1.jpg');
  background-size: cover;
  background-position: center; 
  background-blend-mode: overlay; 
  background-color: rgba(0, 0, 0, 0.3);

  justify-content: center;
  align-items: center;
  text-align: center;
  height: 400px;
  font-size: 20px;
  padding: 40px;
  margin-top: 30px;
  color: #ffffff;
  margin-bottom: 50px;

  /* 아래쪽에만 그림자 */
  box-shadow: 0 10px 10px rgba(80, 80, 80, 0.5);
  
`

// const BannerImage = styled.img`
//   width: 40%;
//   margin-bottom: 10px;
// `

const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  height: 100%;
` 


const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ababab;
  /* margin-top: 50px;
  margin-bottom: 50px; */
`

const Content = styled.div`
  width: 90%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 50px;
`

const ContentText = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  span {
    font-size: 13px;
    margin-top: 10px;
    color: #7c7c7c;
  }
`

const ContentTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`

