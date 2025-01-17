import { useState } from 'react';
import styled from 'styled-components';
import { GrHomeRounded } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Wrapper>
        <Left>
          <IoMenu size={30} onClick={toggleSidebar}/>
          {/* <SidebarToggleButton onClick={toggleSidebar}>☰</SidebarToggleButton> */}
        </Left>
        <Title>예리한 일본어</Title>
        <Right> 
          <GrHomeRounded size={20} onClick={navigate}/>
        </Right>
      </Wrapper>
      <Sidebar isOpen={isSidebarOpen}>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        <MenuContainer>
          <Menu>강사진</Menu>
          <Menu>강의 조회</Menu>
          <Menu>공지사항</Menu>
          <Menu>Q&A</Menu>
        </MenuContainer>
      </Sidebar>
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px;
  border: 1px solid red;
`;

const Title = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'TTBookendBatangR';

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
`;

const Right = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  background-color: #2b2b2b;
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
  font-size: 15px;
  cursor: pointer;
  border-bottom: 1px solid #7c7c7c;
  padding: 5px;

  &:hover {
    color: #45a049;
  }
`;
