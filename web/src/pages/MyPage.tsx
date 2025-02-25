import { CgProfile } from "react-icons/cg"
import styled from "styled-components"

const MyPage = () => {
  return (
    <Wrapper>
      <Header>마이페이지 <span>내 정보 수정</span></Header>
      <ProfileContainer>
        <CgProfile size={70} color="white"/>
        <br/>
        <GreetingText>
          <span style={{fontSize:'18px', textDecoration:'underline', fontWeight:'500'}}>김똥개</span> 님, こんにちは !</GreetingText>
      </ProfileContainer>
    </Wrapper>
  )
}

export default MyPage

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  width: 90%;
  font-size: 22px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    font-weight: 300;
    color: #7c7c7c;
    text-decoration: underline;
    cursor: pointer;
  }
`

const ProfileContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff8255;
  padding: 25px 0;
  border-radius: 10px;
  margin-bottom: 20px;
`

const GreetingText = styled.div`
  font-size: 16px;
  color: white;
`