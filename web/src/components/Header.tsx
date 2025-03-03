import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrHomeRounded } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getKakaoCode } from '../apis/loginAPI';
import { IoMdContact } from "react-icons/io"

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const logoutTemp = () => {
    if(confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('accessToken');
      setIsLogin(false);
    }
    // 화면 새로고침
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      setIsLogin(true);
    }
  }, []);

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
        <Navigator onClick={() => navigate(`/qna`)}>FAQ</Navigator>
      </SecondRow>

      {/* 사이드바 오픈 시 오버레이 렌더링 */}
      {isSidebarOpen && <Overlay onClick={closeSidebar} />}

      <Sidebar $isopen={isSidebarOpen}>
      <CloseButton onClick={toggleSidebar}>×</CloseButton>
        <ButtonContainer>
          {isLogin 
            ? 
            <>
            <MypageButton onClick={() => { navigate(`/mypage`); closeSidebar(); }}>
              <IoMdContact size={30} style={{marginRight: '10px'}}/>마이페이지</MypageButton>
              <LogoutButton onClick={logoutTemp}>로그아웃</LogoutButton>
            </>
            : <LoginButton onClick={() => { getKakaoCode(); closeSidebar(); }}>카카오로 시작하기</LoginButton> }
        </ButtonContainer>
        <MenuContainer>
          <Menu onClick={() => { navigate(`/teachers`); closeSidebar(); }}>선생님 소개</Menu>
          <Menu onClick={() => { navigate(`/courses`); closeSidebar(); }}>강의 조회</Menu>
          <Menu onClick={() => { navigate(`/introduction`); closeSidebar(); }}>학원 안내</Menu>
          <Menu onClick={() => { navigate(`/qna`); closeSidebar(); }}>FAQ</Menu>
        </MenuContainer>
      </Sidebar>
    </>
  );
};

export default Header;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 900;
`;


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
  font-family: 'Pretendard';
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


const Sidebar = styled.div<{ $isopen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isopen }) => ($isopen ? "0" : "-300px")};
  width: 300px;
  height: 100%;
  background-color: #353535;
  color: white;
  transition: left 0.3s ease;
  box-shadow: ${({ $isopen }) => ($isopen ? "2px 0 5px rgba(0, 0, 0, 0.5)" : "none")};
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const Menu = styled.div`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 15px;
  cursor: pointer;
  border-bottom: 1px solid #7c7c7c;
  padding: 5px;

  &:hover {
    color: #949494;
    //오른쪽으로 살짝 이동하는 효과
    transform: translateX(5px);
    transition : transform 0.3s ease;
  }
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 70px;
  gap: 15px;
`;


const LoginButton = styled.button`
  width: 80%;
  height: 50px;
  background-color: none;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #ffe100;
  font-size: 16px;
  font-weight: 500;
  

  &:hover {
    background-color: #767676;
    color: white;
    
  }
`;

const MypageButton = styled.button`
  width: 80%;
  height: 50px;
  background-color: none;
  color: black;
  border: none; 
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #767676;
    color: white;
  }
`;

//////로그아웃 버튼//////
const LogoutButton = styled.div`
  width: 20%;
  color: #bbbbbb;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: white;
  }
`