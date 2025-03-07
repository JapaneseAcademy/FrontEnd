import styled, { keyframes } from "styled-components"
import ReviewCard from "../components/ReviewCard";

const ReviewsPage = () => {
   return (
      <Wrapper>
         <Title>예리 센세와 함께 공부한 수강생들의 <br/> <span style={{fontWeight:'550'}}>생생한 후기</span>를 확인하세요! <span style={{color:'#535353'}}>(490건) </span></Title>
         <ReviewsContainer id="reviews-container">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
         </ReviewsContainer>
      </Wrapper>
   )
}

export default ReviewsPage

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

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: white;
`

const Title = styled.div`
   font-size: 20px;
   font-weight: 400;
   margin-bottom: 30px;
   margin-top: 30px;
   width: 85%;
   /* border-bottom: 1px solid black; */
   //줄간격
   line-height: 1.3;
   //애니메이션 적용
   animation: ${fadeInUp} 0.5s ease-in-out;

`

const ReviewsContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border-top: 1px solid #e1e1e1;
   background-color: #f6fbff;
`