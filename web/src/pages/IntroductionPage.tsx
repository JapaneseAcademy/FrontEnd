import Main from "../components/Main"
import styled, { keyframes } from "styled-components"
import { PiBuildingOfficeLight } from "react-icons/pi";
import { PiSubwayLight } from "react-icons/pi";
import { PiBusLight } from "react-icons/pi";
import KakaoMap from "../components/KakaoMap";

const IntroductionPage = () => {
  const handleLocationClick = () => {
    window.open(
      'https://map.naver.com/p/directions/-/14136838.6851473,4517939.4396946,%EC%84%9C%EC%9A%B8%20%EC%A4%91%EA%B5%AC%20%EC%9D%B8%ED%98%84%EB%8F%991%EA%B0%80%20136-20,,ADDRESS_POI/-/transit?c=15.00,0,0,0,dh',
      '_blank' // 새 탭에서 열리도록 설정
    );
  }


  return (
  
    <>
      {/* <Header /> */}
      <Main>
        <Banner>학원 안내</Banner>
        <Content>
          <Title>학원 위치 안내</Title>

          <LocationContainer id='locationContainer'>

            <Location>
              <IconCircle>
                <PiBuildingOfficeLight style={{padding:'10px'}}></PiBuildingOfficeLight>
              </IconCircle>
              <LocationText>
                <Subtitle>주소</Subtitle>
                <Text>서울 중구 인현동1가 136-20 <br/> 2층 207호</Text>
              </LocationText>
            </Location>

            <Location>
              <IconCircle>
                <PiSubwayLight style={{padding:'10px'}}></PiSubwayLight>
              </IconCircle>
              <LocationText>
                <Subtitle>지하철 이용 시</Subtitle>
                <Text id='stations'>
                  <LocationTextRow><span>2호선</span>| 을지로3가역 <br/> | 을지로4가역 </LocationTextRow>
                  <LocationTextRow><span>3호선</span>| 충무로역 </LocationTextRow>
                  <LocationTextRow><span>4호선</span>| 명동역 </LocationTextRow>
                  <LocationTextRow><span>5호선</span>| 을지로4가역 </LocationTextRow>
                </Text>
              </LocationText>
            </Location>

            <Location>
              <IconCircle>
                <PiBusLight style={{padding:'10px'}}></PiBusLight>
              </IconCircle>
              <LocationText>
                <Subtitle>버스 이용 시</Subtitle>
                <Text>국가위원위, 안중근활동터 / 초동정류장</Text>
              </LocationText>
            </Location>

          </LocationContainer>

          <Title>오시는 길 안내</Title>
          <PathImage onClick={handleLocationClick}></PathImage>
          <div id="instruction">위 이미지를 클릭하시면 네이버 지도로 이동합니다.</div>
          {/* <KakaoMap
            latitude={37.563887} // 위도
            longitude={126.993645}  // 경도
            level={3}
            style={{ width: "100%", aspectRatio: '1/1'}}
            markers={[
              { latitude: 37.563887, longitude: 126.993645, title: "인현동1가 136-20" }
            ]}
         /> */}

        </Content>
      </Main>
      {/* <Footer /> */}
    </>
  )
}

export default IntroductionPage

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
  /* font-weight: bold; */
  
    /* 애니메이션 적용 */
    animation: ${fadeInUp} 0.8s ease-out;
`

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 애니메이션 적용 */
  /* animation: ${fadeInUp} 0.8s ease-out; */

  #instruction {
    font-size: 14px;
    color: #7d7d7d;
  }
`

const Title = styled.div`
  width: 100%;
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0;
  text-align: left;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
`



const Subtitle = styled.div`
  font-size: 19px;
  font-weight: 500;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 16px;
  margin: 5px 0;
  gap: 10px;
`



const PathImage = styled.div`
  background-image: url('/images/location.png');
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 1/1;
  margin: 20px 0;
`

const LocationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 80px;
`

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const IconCircle = styled.div`
  width: 70px;
  height: 70px;
  font-size: 60px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LocationText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const LocationTextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: 600;
  }
`
