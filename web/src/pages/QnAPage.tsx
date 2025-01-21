import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import styled from 'styled-components'

const QnAPage = () => {
  const handleKakaoBtnClick = () => {
    window.open('https://pf.kakao.com/_FxludG')
    // 제대로된 오픈채팅방 넣기
  }

  return (
    <>
      <Header/>
      <Main>
        <Banner>
          {/* <BannerImage src='images/hiragana.png'/> */}
          <BannerText>
            올림피아드를 거친 수많은 
            <br/>
            학생의 데이터를 기반으로
            <br/>
            <span style={{fontWeight:'900'}}>AI가 체계적으로 </span>비교 분석합니다. 
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
          <ContentText>
            상담 문의는 아래 카카오톡으로 부탁드립니다.
            <span>
              [ 상담 가능 시간 ]
              <br/>
              평일 10:00 ~ 17:00
              <br/>
              주말 10:00 ~ 15:00
            </span>
          </ContentText>
          <ContentButton>
            <Button onClick={handleKakaoBtnClick}>카카오톡 문의하기</Button>
          </ContentButton>
        </Content>
      </Main>
      <Footer/>
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

const Content = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #ffffff;
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

const ContentButton = styled.div`
  margin-top: 20px;
`

const Button = styled.button`
  height: 40px;
  color: white;
  background-color: #4d3e2c;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;

  &:hover {
    background-color: #392a20;
  }
`



const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: #636363;
  margin-top: 50px;
`