import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Wrapper>
        <Left>
          <SidebarToggleButton onClick={toggleSidebar}>☰</SidebarToggleButton>
        </Left>
        <Title>예리한 일본어</Title>
        <Right> </Right>
      </Wrapper>
      <Sidebar isOpen={isSidebarOpen}>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        <MenuContainer>
          <Menu>Home</Menu>
          <Menu>About</Menu>
          <Menu>Services</Menu>
          <Menu>Contact</Menu>
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
  border: 1px solid red;
`;

const Title = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;

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
    font-size: 25px;
  }
`;

const Left = styled.div`
  width: 25%;
  height: 100%;
  float: left;
  border: 1px solid blue;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid blue;
`;

const SidebarToggleButton = styled.button`

  color: grey;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const Sidebar = styled.div`
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
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #45a049;
  }
`;