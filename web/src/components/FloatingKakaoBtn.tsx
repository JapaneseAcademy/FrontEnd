import styled from "styled-components";

const FloatingKakaoBtn = () => {
   const KAKAO_CHANNEL_URL = import.meta.env.VITE_KAKAO_CHANNEL_URL;

   const handleClick = () => {
      window.open(KAKAO_CHANNEL_URL, "_blank");
   };

   return (
      <Button onClick={handleClick}>kakao
         {/* <img src="/path/to/kakao-icon.png" alt="카카오톡 문의" /> */}
      </Button>
   );
   };

export default FloatingKakaoBtn;

// Styled Component
const Button = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ffde00;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 위치 */

  img {
    width: 35px;
    height: 35px;
  }

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;
