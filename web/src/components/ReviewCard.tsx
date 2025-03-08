import styled from "styled-components"

interface ReviewCardProps {
   reviewId: number;
   imageUrls: string[];
   review: string;
   writer: string;
   createdDate: string;
   reviewTitle: string;
}

const ReviewCard = ({ reviewId, imageUrls, review, writer, createdDate, reviewTitle }: ReviewCardProps) => {
   return (
      <Wrapper key={reviewId}>
         <ReviewImage src={imageUrls[0]} />
         <ReviewContent>
            <ReviewTitle>{reviewTitle}</ReviewTitle>
            <ReviewText>{review}</ReviewText>
            <ReviewDate><span>{createdDate}</span> <span>{writer}</span></ReviewDate>
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
   //마지막 요소에는 border-bottom을 표시하지 않음
   &:last-child {
      border-bottom: none;
   }
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
   line-height: 1.2;
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
   display: flex;
   justify-content: space-between;
   width: 100%;
   font-size: 14px;
   color: #808080;
`