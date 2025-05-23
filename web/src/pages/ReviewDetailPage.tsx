import { useEffect, useState } from "react";
import styled from "styled-components"
import { getReviewDetail } from "../apis/reviewAPI";

type ReviewDetail = {
   courseTitle: string;
   courseInfoId: number;
   createdDate: string;
   review: string;
   writer: string;
   imageUrls: string[];
   reviewTitle: string;
}

const ReviewDetailPage = () => {
   const reviewId = parseInt(window.location.search.split('=')[1]);
   const [reviewDetail, setReviewDetail] = useState<ReviewDetail>();

   const handleBackButton = () => {
      window.history.back();
   }

   useEffect(() => {
      window.scrollTo(0, 0);
      //reviewId가 없으면
      if (isNaN(reviewId)) {
         alert("잘못된 접근입니다.");
         window.location.href = "/";
      }
      //reviewId가 있으면
      getReviewDetail(reviewId).then((data: ReviewDetail) => {
         console.log(data);
         setReviewDetail(data);
      }
      )
   }, [reviewId])

   return (
      <Wrapper>
         <ReviewContainer>
            <SmallText style={{marginRight:'auto'}}>{reviewDetail?.courseTitle}</SmallText>
            <Title>{reviewDetail?.reviewTitle}</Title>
            <NameAndDate>
               <SmallText>{reviewDetail?.writer==null ? "익명" : reviewDetail?.writer}</SmallText>
               <SmallText>{reviewDetail?.createdDate}</SmallText>
            </NameAndDate>

            <ReviewContents>
               <ReviewImages>
                  {/* imageUrls[0]가 null이면 이미지가 없는 것 */}
                  { reviewDetail?.imageUrls[0] !== null && reviewDetail?.imageUrls.map((url, index) => {
                     return <img key={index} src={url} alt="reviewImage" />
                  }
                  )}
               </ReviewImages>
                  <ReviewText>{reviewDetail?.review}</ReviewText>
            </ReviewContents>
         </ReviewContainer>
         <BackButton onClick={handleBackButton}>뒤로 가기</BackButton>
      </Wrapper>
   )
}

export default ReviewDetailPage

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`

const ReviewContainer = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid #ebebeb;
   padding: 20px;
   margin: 20px;
`

const Title = styled.div`
   font-size: 18px;
   font-weight: 500;
   width: 100%;
   margin-bottom: 10px;
`

const NameAndDate = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
   border-bottom: 1px solid #c3c3c3;
   padding-bottom: 10px;
   margin-bottom: 20px;
`

const SmallText = styled.div`
   font-size: 13px;
   color: #979797;
`

const ReviewContents = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 100%;
`

const ReviewImages = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-bottom: 20px;

   img {
      width: 100%;
      height: auto;
   }
`

const ReviewText = styled.div`
   width: 100%;
   font-size: 14px;
   color: #707070;

   //개행문자 처리
   white-space: pre-wrap;
   word-wrap: break-word;
   word-break: break-all;
`

const BackButton = styled.button`
   width: 90%;
   height: 40px;
   border: none;
   background-color: #ff8255;
   color: white;
   font-size: 14px;
   margin-top: 20px;
   cursor: pointer;

   &:hover {
      background-color: #d86d46;
   }
`