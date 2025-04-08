import styled, { keyframes } from "styled-components";
import ReviewCard from "../components/ReviewCard";
import { useCallback, useEffect, useState } from "react";
import { getAllReviews } from "../apis/reviewAPI";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

type Review = {
   reviewId: number;
   imageUrls: string[];
   review: string;
   writer: string;
   createdDate: string;
   reviewTitle: string;
   best: boolean;
};

const ReviewsPage = () => {
   const [currentReviews, setCurrentReviews] = useState<Review[]>([]);
   const [totalPage, setTotalPage] = useState<number>(0);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [itemsPerPage, setItemsPerPage] = useState<number>(5);
   const [totalReviewsNum, setTotalReviewsNum] = useState<number>(0);

   const navigate = useNavigate();

   const totalGroups = Math.ceil(totalPage / itemsPerPage);
   const currentGroup = Math.ceil(currentPage / itemsPerPage);
   const startPage = (currentGroup - 1) * itemsPerPage + 1;
   const endPage = Math.min(startPage + itemsPerPage - 1, totalPage);

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      const page = pageParam ? parseInt(pageParam, 10) : 1;
      if (!isNaN(page) && page > 0) {
         setCurrentPage(page);
         fetchReviews(page);
      }
   }, []);

   const fetchReviews = useCallback(async (page: number) => {
      try {
         const response = await getAllReviews(page);
         setCurrentReviews(response.reviews);
         setTotalPage(response.totalPage);
         setItemsPerPage(response.listSize);
         setTotalReviewsNum(response.totalElements);
      } catch (error) {
         console.error("후기 데이터를 불러오는 중 오류 발생:", error);
      }
   }, []);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      navigate(`?page=${page}`);
      fetchReviews(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <>
         <Helmet
            title="수강생 후기 - 예리한 일본어"
            meta={[
               {
                  name: "description",
                  content: "예리한 일본어 수강생들의 생생한 후기를 확인하세요!",
               },
            ]}
            link={[{ rel: "canonical", href: "https://www.yeri-jp.com/reviews" }]}
         />
         <Wrapper>
            <Title>
               예리 센세와 함께 공부한 수강생들의 <br />{" "}
               <span style={{ fontWeight: "550" }}>생생한 후기</span>를 확인하세요!{" "}
               <span style={{ color: "#535353" }}>({totalReviewsNum}건) </span>
            </Title>
            <ReviewsContainer id="reviews-container">
               {currentReviews.map((review) => (
                  <ReviewCard
                     key={review.reviewId}
                     reviewId={review.reviewId}
                     imageUrls={review.imageUrls}
                     review={review.review}
                     writer={review.writer}
                     createdDate={review.createdDate}
                     reviewTitle={review.reviewTitle}
                     best={review.best}
                  />
               ))}
            </ReviewsContainer>
            <Pagination>
               {currentGroup > 1 && (
                  <NextButton onClick={() => handlePageChange(startPage - 1)}>〈</NextButton>
               )}
               {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
                  (number) => (
                     <PageButton
                        key={number}
                        onClick={() => handlePageChange(number)}
                        $active={currentPage === number}
                     >
                        {number}
                     </PageButton>
                  )
               )}
               {currentGroup < totalGroups && (
                  <NextButton onClick={() => handlePageChange(endPage + 1)}>〉</NextButton>
               )}
            </Pagination>
         </Wrapper>
      </>
   );
};

export default ReviewsPage;

// Styled components...

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
   //footer와 겹치지 않도록
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
   border-bottom: 1px solid #e1e1e1;
   background-color: #f6fbff;
`

///페이지네이션
const Pagination = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 20px;
   gap: 10px;
`

const PageButton = styled.button<{ $active: boolean }>`
   width: 30px;
   height: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
   cursor: pointer;
   border: 1px solid ${({ $active }) => ($active ? "#ff8255" : "#e1e1e1")};
   background-color: ${({ $active }) => ($active ? "#ff8255" : "#fff")};
   color: ${({ $active }) => ($active ? "#fff" : "#000")};

   &:hover {
      background-color: #f1f1f1;
      border: 1px solid #f1f1f1;
      color: #fff;
   }
`;

const NextButton = styled.button`
   width: 30px;
   height: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
   cursor: pointer;
   border: 1px solid #e1e1e1;
   background-color: #fff;
   color: #000;   
   `