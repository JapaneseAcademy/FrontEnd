import { useEffect, useState } from "react"
import styled from "styled-components"
import { getMainBestReviews } from "../../apis/reviewAPI";

type MainReview = {
   reviewId: number;
   courseInfoId: number;
   reviewTitle: string;
   review: string;
   writer: string;
   createdDate: string;
   courseTitle: string;
   imageUrls: string[];
}

const DownReviews = () => {
   const [mainBestReviews, setMainBestReviews] = useState<MainReview[]>([]);

   useEffect(() => {
      getMainBestReviews().then((data) => {
         setMainBestReviews(data);
      });
   }, []);

   useEffect(() => {
      console.log("mainbestreviews 세팅 후: ", mainBestReviews);
   }
   , [mainBestReviews]);

   return (
      <Wrapper id='down-reviews-wrapper'>
      {mainBestReviews.map((review) => (
         <ReviewCard key={review.reviewId}>
            <CourseTitle>{review.courseTitle}</CourseTitle>
            <ReviewTitle>{review.reviewTitle}</ReviewTitle>
            <ReviewImages>
               {/* 4개 이상이면 4개까지만, 이하면 그대로 표시 */}
               {review.imageUrls.slice(0, 4).map((url, index) => (
                  <ReviewImage key={index} src={url} alt='review-image' />
               ))}
            </ReviewImages>
            <ReviewText>{review.review}</ReviewText>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <ReviewDate>{review.createdDate}</ReviewDate>
               <Writer>{review.writer}</Writer>
            </div>
         </ReviewCard>
      ))}
      </Wrapper>
   )
}

export default DownReviews

const Wrapper = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap; /* 줄바꿈 방지 */
   overflow-x: auto; /* 가로 스크롤 활성화 */
   gap: 20px; /* 카드 간 간격 */
   padding-bottom: 10px;

   /* 스크롤바 스타일 (선택 사항) */
   &::-webkit-scrollbar {
      height: 8px; /* 스크롤바 높이 */
   }

   &::-webkit-scrollbar-thumb {
      background-color: #c6c6c6; /* 스크롤바 색상 */
      border-radius: 4px; /* 둥근 모서리 */
   }

   &::-webkit-scrollbar-track {
      background-color: #f1f1f1; /* 스크롤바 배경 */
   }
`;

const ReviewCard = styled.div`
   width: 300px; /* 고정 너비 */
   height: 320px; /* 고정 높이 */
   flex-shrink: 0; /* 너비가 줄어들지 않도록 설정 */
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   border: 1px solid #e2e2e2;
   background-color: white;
   border-radius: 5px;
   padding: 20px;
`;

const CourseTitle = styled.span`
   color: #777777;
   font-size: 14px;
   border-bottom: 1px solid #e2e2e2;
   padding-bottom: 5px;
`;

const ReviewTitle = styled.span`
   font-size: 16px;
   font-weight: 500;
`;

const ReviewImages = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const ReviewImage = styled.img`
   width: 100px;
   height: 100px;
   aspect-ratio: 1/1;
   object-fit: cover;
   border-radius: 5px;
`;

const ReviewText = styled.div`
   width: 100%;
   font-size: 14px;
   line-height: 1.4;
   color: #333333;

   /* ✅ 여러 줄에서 ...을 적용하는 스타일 */
   display: -webkit-box;
   -webkit-line-clamp: 4; /* 최대 3줄까지만 표시 */
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
`;


const ReviewDate = styled.span`
   font-size: 12px;
   color: #a0a0a0;
`;

const Writer = styled.span`
   font-size: 12px;
   color: #a0a0a0;
`;