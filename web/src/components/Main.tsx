import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface MainProps {
  children?: ReactNode; // children을 받도록 설정
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;
