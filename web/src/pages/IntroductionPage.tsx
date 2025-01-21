import Footer from "../components/Footer"
import Header from "../components/Header"
import Main from "../components/Main"
import styled from "styled-components"
import Map from "../components/Map"

const IntroductionPage = () => {


  return (
    
    
    <>
      <Header />
      <Main>
        <Banner>학원 안내</Banner>
        <Content>
          <Title>학원 위치 안내</Title>
          <Map/>
          <Title>오시는 길 안내</Title>
          <Subtitle>버스</Subtitle>
          <Text>버스 정류장에서 5분 거리에 위치하고 있습니다.</Text>
          <Subtitle>지하철</Subtitle>
          <Text>지하철 역에서 10분 거리에 위치하고 있습니다.</Text>
        </Content>
      </Main>
      <Footer />
    </>
  )
}

export default IntroductionPage

const Banner = styled.div`
  background-image: url('/images/academy_interior.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.3);

  height: 300px;
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  font-family: 'TTBookendBatangR';
  font-weight: bold;
`

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  margin: 20px 0;
  text-align: left;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
`



const Subtitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`

const Text = styled.div`
  font-size: 16px;
  margin: 5px 0;
`