import styled from "styled-components"

const ReviewFilter = () => {
  return (
    <Wrapper id="filter-container-wrapper">
      <CourseDropdown>
         <option value="all">강의</option>
         <option value="talk-secret">고수들의 회화비밀</option>
         <option value="oneshot1">원샷반1</option>
         <option value="english">집에서 원서읽기</option>
         <option value="english">예리에몽의 회화포켓</option>
      </CourseDropdown>
      <SearchInput placeholder="검색어를 입력하세요." />
      <OrderOption>
         <option value="name">최신순</option>
         <option value="birth">오래된 순</option>
      </OrderOption>
   </Wrapper>
  )
}

export default ReviewFilter

const Wrapper = styled.div`
   width: 95%;  
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 10px;
`

const CourseDropdown = styled.select`
   width: 30%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   //글씨 크기
   font-size: 0.8rem;

   //hover
   &:hover {
      background-color: #f1f1f1;
   }
`

const SearchInput = styled.input`
   width: 50%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;
   border: 1px solid #333;

   &:hover {
      background-color: #f1f1f1;
   }
`

const OrderOption = styled.select`
   width: 15%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;

   &:hover {
      background-color: #f1f1f1;
   }
`

