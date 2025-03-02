import styled from "styled-components";
import { useEffect, useState } from "react";
import { REVIEWS_DATA } from "../../constants/example.ts";
import ReviewFilter from "./filters/ReviewFilter.tsx";
import { FaRegCircleCheck } from "react-icons/fa6";

type Review = {
   reviewId: number;

   courseTitle: string;
   user: string;
   reviewDate: string;
   reviewTitle: string;
   reviewText: string;
   reviewImages: string[];
   
   mainBest: boolean;
   courseBest: boolean;
};

const Out_ReviewsList = () => {
   const [selectedReviewId, setSelectedStudentId] = useState<number | null>(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [currentGroup, setCurrentGroup] = useState(1); // 페이지 그룹 추가
   const [currentReviews] = useState<Review[]>(REVIEWS_DATA); // 초기 데이터 설정

   const [isMainBest, setIsMainBest] = useState(false);
   const [isCourseBest, setIsCourseBest] = useState(false);
   const [isReviewHidden, setIsReviewHidden] = useState(false);

   const ItemsPerPage = 10;
   const PagesPerGroup = 10; // 한 그룹당 10개의 페이지

   // 선택한 리뷰 데이터 가져오기
   const selectedReview = currentReviews.find(
      (review) => review.reviewId === selectedReviewId
   );

   // 페이지네이션 계산
   const totalPages = Math.ceil(currentReviews.length / ItemsPerPage);
   const startIndex = (currentPage - 1) * ItemsPerPage;
   const endIndex = startIndex + ItemsPerPage;
   const paginatedReviews = currentReviews.slice(startIndex, endIndex);

   // 현재 페이지 그룹 계산
   const startPage = (currentGroup - 1) * PagesPerGroup + 1;
   const endPage = Math.min(startPage + PagesPerGroup - 1, totalPages);
   const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
   );

   const handleMainBestChange = () => {
      if (confirm("메인 베스트로 설정하시겠습니까?")) {
         //{todo: 메인 베스트로 설정 api 호출}

         //성공시
         alert("메인 베스트로 설정되었습니다.");
         setIsMainBest(!isMainBest);
      }
   };
   
   const handleCourseBestChange = () => {
      if (confirm("강의 베스트로 설정하시겠습니까?")) {
         //{todo: 강의 베스트로 설정 api 호출}

         //성공시
         alert("강의 베스트로 설정되었습니다.");
         setIsCourseBest(!isCourseBest);
      }
   };


   useEffect(() => {
      if (selectedReview) {
         setIsMainBest(selectedReview.mainBest);
         setIsCourseBest(selectedReview.courseBest);
      }
   }, [selectedReview]);
   

   return (
      <Wrapper id="admin-reviews-list-wrapper">
         <StudentListContainer id="reviews-list-container">
         <Title>리뷰 목록</Title>
         <ReviewFilter />
         <ReviewsTable>
            <TableHeader>
               <TableHeaderItem>강의명</TableHeaderItem>
               <TableHeaderItem>제목</TableHeaderItem>
               <TableHeaderItem>내용</TableHeaderItem>
               <TableHeaderItem>작성일</TableHeaderItem>
               <TableHeaderItem style={{fontSize:'0.8rem'}}>메인 베스트</TableHeaderItem>
               <TableHeaderItem style={{fontSize:'0.8rem'}}>강의 베스트</TableHeaderItem>
            </TableHeader>
            <TableBody id="review-table-body">
               {paginatedReviews.map((review) => (
               <TableRow
                  key={review.reviewId}
                  isSelected={review.reviewId === selectedReviewId}
                  onClick={() => setSelectedStudentId(review.reviewId)}
               >
                  <TableItem className="courseTitle" style={{color:'#5e5e5e', fontSize:'0.8rem'}}>{review.courseTitle}</TableItem>
                  <TableItem className="reviewTitle">{review.reviewTitle}</TableItem>
                  <TableItem className="reviewText">{review.reviewText}</TableItem>
                  <TableItem className="reviewDate" style={{color:'#5e5e5e', fontSize:'0.8rem'}}>{review.reviewDate}</TableItem>
                  <TableItem className="mainBest">{review.mainBest?<FaRegCircleCheck color="#84cb26"/>:""}</TableItem>
                  <TableItem className="courseBest">{review.courseBest?<FaRegCircleCheck color="#ff7b1c"/>:""}</TableItem>
               </TableRow>
               ))}
            </TableBody>
         </ReviewsTable>

         {/* 페이지네이션 */}
         <Pagination>
            <PageButton
               disabled={currentGroup === 1}
               onClick={() => {
               setCurrentGroup((prev) => Math.max(prev - 1, 1));
               setCurrentPage((prev) => Math.max(prev - PagesPerGroup, 1));
               }}
            >
               이전
            </PageButton>
            {pageNumbers.map((page) => (
               <PageNumber
               key={page}
               onClick={() => setCurrentPage(page)}
               active={currentPage === page}
               >
               {page}
               </PageNumber>
            ))}
            <PageButton
               disabled={endPage === totalPages}
               onClick={() => {
               setCurrentGroup((prev) =>
                  Math.min(prev + 1, Math.ceil(totalPages / PagesPerGroup))
               );
               setCurrentPage((prev) =>
                  Math.min(prev + PagesPerGroup, totalPages)
               );
               }}
            >
               다음
            </PageButton>
         </Pagination>
         </StudentListContainer>

         <ReviewsDetailContainer id="reviews-detail-container">
         <DetailRow>
            <DetailTitle>강의명</DetailTitle>
            <DetailContent>{selectedReview?.courseTitle}</DetailContent>
         </DetailRow>
         <DetailRow>
            <DetailTitle>작성자</DetailTitle>
            <DetailContent>{selectedReview?.user}</DetailContent>
         </DetailRow>
         <DetailRow>
            <DetailTitle>작성일</DetailTitle>
            <DetailContent>{selectedReview?.reviewDate}</DetailContent>
         </DetailRow>
         <DetailRow>
            <DetailTitle>제목</DetailTitle>
            <DetailContent>{selectedReview?.reviewTitle}</DetailContent>
         </DetailRow>
         <DetailRow>
            <DetailTitle>내용</DetailTitle>
            <DetailContent>{selectedReview?.reviewText}</DetailContent>
         </DetailRow>
         <DetailRow>
            <DetailTitle>사진</DetailTitle>
            <DetailContent>
               {selectedReview?.reviewImages.map((image, index) => (
               <ReviewImage key={index} src={image} alt={`review-${index}`} />
               ))}
            </DetailContent>
         </DetailRow>
      
         <ChoiceRow>
            <CheckBox>
               <input
                  type="checkbox"
                  id="main-best"
                  checked={isMainBest}
                  onChange={handleMainBestChange}
               />
               <label htmlFor="main-best">메인 베스트</label>
            </CheckBox>

            <CheckBox>
               <input
                  type="checkbox"
                  id="course-best"
                  checked={isCourseBest}
                  onChange={handleCourseBestChange}
               />
               <label htmlFor="course-best">강의 베스트</label>
            </CheckBox>
         </ChoiceRow>
         <ChoiceRow>
            <CheckBox>
               <input
                  type="checkbox"
                  id="review-hidden"
                  checked={isReviewHidden}
                  onChange={() => setIsReviewHidden(!isReviewHidden)}
               />
               <label htmlFor="review-hidden">리뷰 숨김</label>
            </CheckBox>
         </ChoiceRow>
         </ReviewsDetailContainer>
      </Wrapper>
   );
};

export default Out_ReviewsList;

// 스타일링 코드 (생략 가능)


const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
`

const StudentListContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
background-color: #ffffff;
width: 70%;
height: 100%;
border-right: 1px solid #e1e1e1;
`

const Title = styled.div`
width: 95%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-top: 20px;
margin-bottom: 20px;
padding-bottom: 15px;
border-bottom: 1px solid #e1e1e1;
font-weight: bold;
font-size: 1.5rem;
`




const ReviewsTable = styled.div`
width: 95%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
border: 1px solid #e1e1e1;
`

const TableHeader = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 10px 0;
background-color: #d7d7d7;
font-size: 1rem;
font-weight: 500;
`
const TableHeaderItem = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;


//id에 따라서 width 조절
width: 30%;
   &:nth-child(1) {
      width: 15%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(2) {
      width: 22%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(3) {
      width: 43%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(4) {
      width: 12%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(5) {
      width: 4%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(6) {
      width: 4%;
   }
`

const TableItem = styled.div`
   width: 30%;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* 최대 2줄까지 표시 */
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
   word-break: break-word;
   line-height: 1.4rem; /* 줄 높이 설정 */
   max-height: calc(1.4rem * 2); /* 최대 2줄까지만 표시 */

   &:nth-child(1) {
      width: 15%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(2) {
      width: 22%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(3) {
      width: 43%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(4) {
      width: 12%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(5) {
      width: 4%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(6) {
      width: 4%;
   }

   padding: 5px;
`;

const TableBody = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-size: 0.9rem;


height: 100%;

` 
const TableRow = styled.div<{ isSelected: boolean }>`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-top: 4px;
padding-bottom: 4px;
border-bottom: 1px solid #e1e1e1;
cursor: pointer;
font-size: 0.9rem;
background-color: ${({ isSelected }) => (isSelected ? "#e6f7ff" : "transparent")}; 

&:hover {
   background-color: ${({ isSelected }) => (isSelected ? "#cceeff" : "#f1f1f1")}; 
}

//마지막 요소는 border-bottom 없애기
&:last-child {
   border-bottom: none;
}

`;




const ReviewsDetailContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
background-color: #ffffff;
width: 30%;
height: 100%;
border-right: 1px solid #e1e1e1;
padding-top: 20px;
padding-bottom: 20px;
gap: 20px;

//스크롤바
overflow-y: auto;

`

const DetailRow = styled.div`
width: 90%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 5px;
`

const DetailTitle = styled.div`
width: 15%;
font-weight: 500;
font-size: 1rem;
`

const DetailContent = styled.div`
font-size: 0.9rem;
border: 1px solid #e1e1e1;
background-color: #f7f7f7;
padding: 5px;
width: 90%;
border-radius: 5px;
`

const ReviewImage = styled.img`
   width: 120px;
   height: 120px;
   object-fit: cover;
   object-position: center;
   border-radius: 5px;
`;

const ChoiceRow = styled.div`
width: 85%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 20px;
font-size: 0.8rem;
`

const CheckBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 5px;
`



//페이지네이션
const Pagination = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 10px;
margin-top: 20px;
`

const PageButton = styled.button`
width: 40px;
height: 25px;
font-size: 12px;
border: 1px solid #e1e1e1;
background-color: #ffffff;
cursor: pointer;
&:hover {
   background-color: #f1f1f1;
}
&:disabled {
   background-color: #e1e1e1;
   cursor: not-allowed;
}

`

const PageNumber = styled.div<{ active: boolean }>`
width: 25px;
height: 25px;
font-size: 12px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;  
background-color: ${({ active }) => (active ? "#e6f7ff" : "transparent")};
border: 1px solid #e1e1e1;
&:hover {
   background-color: ${({ active }) => (active ? "#cceeff" : "#f1f1f1")};
}
`