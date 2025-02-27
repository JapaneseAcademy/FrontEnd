import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";

const FloatingKakaoBtn = () => {
   const KAKAO_CHANNEL_URL = import.meta.env.VITE_KAKAO_CHANNEL_URL;

   const handleClick = () => {
      window.open(KAKAO_CHANNEL_URL, "_blank");
   };

   return (
      <Button onClick={handleClick}>
         {/* <img src="/images/snsButtons/kakaotalk1.png" alt="카카오톡 문의" /> */}
         <RiKakaoTalkFill style={{ color: "#3C1E1E", fontSize: "30px" }} />
      </Button>
   );
   };

export default FloatingKakaoBtn;

// Styled Component
const Button = styled.div`
   position: fixed;
   bottom: 30px;
   right: 20px;
   width: 55px;
   height: 55px;
   background-color: #ffe434;
   border-radius: 50%;
   box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.1);
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000; /* 다른 요소보다 위에 위치 */


   &:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
      transition: all 0.3s ease;
   }                     
`;
