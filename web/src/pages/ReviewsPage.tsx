import styled, { keyframes } from "styled-components"
import ReviewCard from "../components/ReviewCard";
import { useCallback, useEffect, useState } from "react";
import { getAllReviews } from "../apis/reviewAPI";
import { Helmet } from "react-helmet-async";

type Review = {
   reviewId: number;

   imageUrls: string[];
   review: string;
   writer: string;
   createdDate: string;
   reviewTitle: string;
   best: boolean;
}

const ReviewsPage = () => {
   const [currentReviews, setCurrentReviews] = useState<Review[]>([]);
   const [totalPage, setTotalPage] = useState<number>(0);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [itemsPerPage, setItemsPerPage] = useState<number>(5);
   const [totalReviewsNum, setTotalReviewsNum] = useState<number>(0);

   const totalGroups = Math.ceil(totalPage / itemsPerPage); // 전체 그룹 개수
   const currentGroup = Math.ceil(currentPage / itemsPerPage); // 현재 그룹
   const startPage = (currentGroup - 1) * itemsPerPage + 1;
   const endPage = Math.min(startPage + itemsPerPage - 1, totalPage);


   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      getAllReviews(page).then((data) => {
         setCurrentReviews(data.reviews);
      });
      //맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

     /////////후기관련////////
   const fetchReviews = useCallback(async (page: number) => {
      try {
         const response = await getAllReviews(page); // 페이지 번호에 해당하는 후기 데이터 요청
         setCurrentReviews(response.reviews); // 받아온 후기 데이터 업데이트
         setTotalPage(response.totalPage); // 총 페이지 수 업데이트 (백엔드에서 제공)
         setItemsPerPage(response.listSize); // 페이지 당 아이템 수 업데이트 (백엔드에서 제공)
         setTotalReviewsNum(response.totalElements); // 총 후기 수 업데이트 (백엔드에서 제공)
      } catch (error) {
         console.error("후기 데이터를 불러오는 중 오류 발생:", error);
      }
   }, []); // ✅ courseInfoId가 변경될 때만 새로운 fetchReviews 함수가 생성됨


   useEffect(() => {
      window.scrollTo(0, 0); // 페이지 로드 시 맨 위로 스크롤
   }, []); // ✅ 페이지 로드 시 한 번만 실행
   
     // ✅ 페이지 로드 시 초기 데이터 가져오기
   useEffect(() => {
      fetchReviews(1); // 첫 페이지의 후기 데이터 요청 {TODO: 이거 제대로 바꾸기(잘 도됨...)}
   }, [fetchReviews]); 


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
            <Title>예리 센세와 함께 공부한 수강생들의 <br/> <span style={{fontWeight:'550'}}>생생한 후기</span>를 확인하세요! <span style={{color:'#535353'}}>({totalReviewsNum}건) </span></Title>
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
               {/* 이전 그룹 버튼 */}
               {currentGroup > 1 && (
                  <NextButton onClick={() => handlePageChange(startPage - 1)}>〈</NextButton>
               )}

               {/* 현재 그룹의 페이지 버튼 */}
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

               {/* 다음 그룹 버튼 */}
               {currentGroup < totalGroups && (
                  <NextButton onClick={() => handlePageChange(endPage + 1)}>〉</NextButton>
               )}
            </Pagination>
         </Wrapper>
      </>
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