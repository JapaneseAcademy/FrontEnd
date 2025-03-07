import styled from "styled-components"

const ReviewCard = () => {
   return (
      <Wrapper>
         <ReviewImage src="/images/review/review1.jpg" />
         <ReviewContent>
            <ReviewTitle>예리 센세의 수업을 듣고 느낀 점이무니다.....</ReviewTitle>
            <ReviewText>예리 센세의 수업을 듣고 느낀 점을 솔직하게 작성해주세요. 수업이 어땠는지, 센세의 가르침이 어땠는지, 수업을 듣고 느낀 점 등을 자유롭게 작성해주세요. 예리 센세의 수업을 듣고 느낀 점을 솔직하게 작성해주세요. 수업이 어땠는지, 센세의 가르침이 어땠는지, 수업을 듣고 느낀 점 등을 자유롭게 작성해주세요.</ReviewText>
            <ReviewDate>2021.09.01</ReviewDate>
         </ReviewContent>
      </Wrapper>
   )
}

export default ReviewCard

const Wrapper = styled.div`   
   width: 85%;
   height: 190px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   border-bottom: 1px solid #e0e0e0;
   padding: 25px 0;

   gap: 15px;
`

const ReviewImage = styled.img`
   height: 100%;
   aspect-ratio: 1/1;
   object-fit: cover;
   object-position: center;
`

const ReviewTitle = styled.div`
   width: 100%;
   font-size: 16px;
   font-weight: 500;
   margin-bottom: 10px;

   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap; // 한 줄만 표시
`;

const ReviewText = styled.div`
   width: 100%;
   font-size: 14px;
   margin-bottom: 5px;
   margin-top: auto;

   display: -webkit-box;
   -webkit-line-clamp: 5; // 최대 5줄까지만 표시
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
   //줄간격
   line-height: 1.3;
`;

const ReviewContent = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   overflow: hidden; // 내부 요소가 벗어나지 않도록
   max-height: 150px; // 이미지와 동일한 높이 유지
`;


const ReviewDate = styled.div`
   width: 100%;
   font-size: 14px;
   color: #808080;
`