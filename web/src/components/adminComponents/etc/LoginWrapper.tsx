import styled from "styled-components"

interface LoginWrapperProps {
   onLoginSuccess: () => void;
}

const LoginWrapper = ({ onLoginSuccess }: LoginWrapperProps) => {

   // 아직 관리자 토큰인지 검증하는 api 완성 안 돼서, 
   // 일단 로그인 버튼 클릭만 하면 관리자 인증되는 걸로 설정
   const handleLogin = () => {
      // 관리자 토큰 발급
      onLoginSuccess();
   }

   return (
      <Wrapper>
         <LoginContainer>
            <span>예리한 일본어</span>
            <LoginTitle>관리자 로그인</LoginTitle>
            <KakaoLoginButton onClick={handleLogin}>카카오 로그인</KakaoLoginButton>
         </LoginContainer>
      </Wrapper>
   )
}

export default LoginWrapper

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: row;
   background-color: #f7f7f7;
   width: 100%;
   height: 100%;
`

const LoginContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background-color: #ffffff;
   width: 400px;
   height: 200px;
   border-radius: 10px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

   span {
      font-size: 0.8rem;
      color: #636363;
   }
`

const LoginTitle = styled.div`
   font-size: 1.5rem;
   margin-bottom: 30px;
`

const KakaoLoginButton = styled.button`
   width: 80%;
   height: 50px;
   background-color: #ffe800;
   border: none;
   border-radius: 5px;
   font-size: 1rem;
   cursor: pointer;

   &:hover {
      background-color: #ffcd00;
   }
`



