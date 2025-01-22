import { useState } from 'react';
import styled from 'styled-components';
import { GrHomeRounded } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getKakaoCode } from '../apis/loginAPI';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <FirstRow>
        <Left>
          <IoMenu size={30} onClick={toggleSidebar}/>
          {/* <SidebarToggleButton onClick={toggleSidebar}>☰</SidebarToggleButton> */}
        </Left>
        <Title onClick={() => navigate('/')}>예리한 일본어</Title>
        <Right> 
          <GrHomeRounded size={20} onClick={ () => navigate(`/`)}/>
        </Right>
      </FirstRow>
      <SecondRow>
        <Navigator onClick={() => navigate('/teachers')}>선생님 소개</Navigator>
        <Navigator onClick={() => navigate(`/courses`)}>강좌 목록</Navigator>
        <Navigator onClick={() => navigate(`/introduction`)}>학원 안내</Navigator>
        <Navigator onClick={() => navigate(`/qna`)}>상담 문의</Navigator>
      </SecondRow>

      <Sidebar isOpen={isSidebarOpen}>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        <ButtonContainer>
          <SignupButton onClick={ () => navigate(`/signup`)}>회원가입</SignupButton>
          <LoginButton onClick={getKakaoCode}>로그인</LoginButton>
        </ButtonContainer>
        <MenuContainer>
          <Menu onClick={ () => navigate(`/teachers`)}>선생님 소개</Menu>
          <Menu onClick={ () => navigate(`/courses`)}>강의 조회</Menu>
          <Menu onClick={ () => navigate(`/introduction`)}>학원 안내</Menu>
          <Menu onClick={ () => navigate(`/qna`)}>상담 문의</Menu>
        </MenuContainer>
      </Sidebar>
    </>
  );
};

export default Header;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  height: 55px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px;
  /* 그림자로 구분 */
  /* box-shadow: 0 0px 10px rgba(80, 80, 80, 0.5); */
  border-bottom: 2px solid #e2e2e2;

  /* 스크롤해도 상단에 고정 */
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 1000;

  
`;

const Title = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'TTBookendBatangR';
  cursor: pointer;
  font-size: 35px;

  /* desktop 규격 */
  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }

  /* tablet 규격 */
  @media screen and (max-width: 1023px) {
    font-size: 30px;
  }

  /* mobile 규격 */
  @media screen and (max-width: 540px) {
    font-size: 20px;
  }
`;

const Left = styled.div`
  width: 25%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;

  svg { /* 아이콘 스타일 */
    cursor: pointer; /* 클릭 가능한 커서 */
    transition: color 0.3s ease;

    &:hover {
      color: #929292; /* 호버 시 색상 강조 */
    }
  }
`;

const Right = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg { /* 아이콘 스타일 */
    cursor: pointer; /* 클릭 가능한 커서 */
    transition: color 0.3s ease;

    &:hover {
      color: #929292; /* 호버 시 색상 강조 */
    }
  }
`;

const SecondRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e2e2;

  /* FirstRow와 겹치지 않도록 여백 추가 */
  margin-top: 55px;
  /* 그림자로 구분 */
  /* box-shadow: 0 0px 10px rgba(80, 80, 80, 0.5); */
  background-color: white;
`;

const Navigator = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  cursor: pointer;

  /* 호버 시 색상 강조 */
  &:hover {
    color: #7c7c7c;
    /*밑으로 들어가는 입체 효과*/
    transform: translateY(2px);
    transition : transform 0.3s ease;
  }

  /* desktop 규격 */
  @media screen and (min-width: 1024px) {
    font-size: 18px;
  }

  /* tablet 규격 */
  @media screen and (max-width: 1023px) {
    font-size: 15px;
  }

  /* mobile 규격 */
  @media screen and (max-width: 540px) {
    font-size: 13px;
  }
`;


interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #4d3e2c;
  color: white;
  transition: left 0.3s ease;
  box-shadow: ${({ isOpen }) => (isOpen ? '2px 0 5px rgba(0, 0, 0, 0.5)' : 'none')};
  z-index: 1000;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #ccc;
  }
`;

const MenuContainer = styled.div`
  padding: 20px;
  margin-top: 40px;
`;

const Menu = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 15px;
  cursor: pointer;
  border-bottom: 1px solid #7c7c7c;
  padding: 5px;

  &:hover {
    color: #949494;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 70px;
  gap: 15px;
`;

const SignupButton = styled.button`
  width: 40%;
  height: 40px;
  color: white;
  background-color: #4d3e2c;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 1.5px solid #7c7c7c;

  &:hover {
    background-color: #392a20;
  }
`;

const LoginButton = styled.button`
  width: 40%;
  height: 40px;
  background-color: none;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #392a20;
    color: white;
  }
`;