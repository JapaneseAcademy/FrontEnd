import styled from "styled-components";
import FilterContainer from "./etc/FilterContainer";
import { useState } from "react";
import { REVIEWS_DATA } from "../../constants/example";

const Out_StudentsList = () => {
const [selectedReviewId, setSelectedStudentId] = useState<number | null>(1);


// 선택한 학생의 데이터 가져오기
const selectedReview = REVIEWS_DATA.find(
   (review) => review.reviewId === selectedReviewId
);


return (
   <Wrapper id='admin-students-list-wrapper'>

      <StudentListContainer id="student-list-container">
      <Title>
         리뷰 목록
      </Title>
      <FilterContainer />
      <ReviewsTable>
         <TableHeader>
            <TableHeaderItem>강의명</TableHeaderItem>
            <TableHeaderItem>작성자</TableHeaderItem>
            <TableHeaderItem>제목</TableHeaderItem>
            <TableHeaderItem>내용</TableHeaderItem>
            <TableHeaderItem>작성일</TableHeaderItem>
         </TableHeader>
         <TableBody>
            {REVIEWS_DATA.map((review) => (
            <TableRow
               key={review.reviewId}
               onClick={() => {
                  setSelectedStudentId(review.reviewId);
               }}
               isSelected={selectedReviewId === review.reviewId}
            >
               <TableItem>{review.courseTitle}</TableItem>
               <TableItem>{review.name}</TableItem>
               <TableItem>{review.reviewTitle}</TableItem>
               <TableItem>{review.reviewText}</TableItem>
               <TableItem>{review.date}</TableItem>
            </TableRow>
            ))}
         </TableBody>
      </ReviewsTable>
      </StudentListContainer>

      <StudentDetailContainer id="student-detail-container">
      <DetailRow>
         <DetailTitle>강의명</DetailTitle>
         <DetailContent>{selectedReview?.courseTitle}</DetailContent>
      </DetailRow>
      <DetailRow>
         <DetailTitle>작성자</DetailTitle>
         <DetailContent>{selectedReview?.name}</DetailContent>
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
         <DetailTitle>작성일</DetailTitle>
         <DetailContent>{selectedReview?.date}</DetailContent>
      </DetailRow>

      <ButtonsContainer>

      </ButtonsContainer>
      </StudentDetailContainer>
   </Wrapper>
);
};

export default Out_StudentsList;

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
width: 90%;
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
width: 90%;
display: flex;
height: 80%;
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
padding: 10px;
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
   width: 20%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(2) {
   width: 20%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(3) {
   width: 30%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(4) {
   width: 50%;
   border-right: 1px solid #e1e1e1;

}
&:nth-child(5) {
   width: 10%;
}
`

const TableBody = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-size: 0.9rem;

//넘어가면 스크롤 가능하도록
overflow-y: scroll;
height: 100%;
` 
const TableRow = styled.div<{ isSelected: boolean }>`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-left: 10px;
padding-top: 9px;
padding-bottom: 9px;
border-bottom: 1px solid #e1e1e1;
cursor: pointer;
background-color: ${({ isSelected }) => (isSelected ? "#e6f7ff" : "transparent")}; 

&:hover {
   background-color: ${({ isSelected }) => (isSelected ? "#cceeff" : "#f1f1f1")}; 
}


`;

const TableItem = styled.div`
width: 30%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

   //id에 따라서 width 조절
   width: 30%;
&:nth-child(1) {
   width: 20%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(2) {
   width: 20%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(3) {
   width: 30%;
   border-right: 1px solid #e1e1e1;
}
&:nth-child(4) {
   width: 50%;
   border-right: 1px solid #e1e1e1;

}
&:nth-child(5) {
   width: 10%;
}

max-width: 200px;

`



const StudentDetailContainer = styled.div`
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
gap: 40px;
`

const DetailRow = styled.div`
width: 85%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 10px;
`

const DetailTitle = styled.div`
width: 20%;
font-weight: bold;
font-size: 1rem;
`

const DetailContent = styled.div`
font-size: 0.9rem;
border: 1px solid #e1e1e1;
background-color: #f7f7f7;
padding: 10px;
width: 80%;
border-radius: 5px;
`



const ButtonsContainer = styled.div`
width: 85%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
gap: 10px;
`
