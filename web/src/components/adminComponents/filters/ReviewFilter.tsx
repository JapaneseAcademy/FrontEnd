import styled from "styled-components"

const ReviewFilter = () => {
  return (
    <Wrapper id="filter-container-wrapper">
      <CourseDropdown>
         <option value="all">클래스</option>
         <option value="japanese">기초 회화 1반</option>
         <option value="chinese">중급 회화1 반</option>
         <option value="english">고급 회화 1반</option>
      </CourseDropdown>
      <SearchInput placeholder="이름" />
      <OrderOption>
         <option value="name">이름 순</option>
         <option value="birth">생년월일 순</option>
      </OrderOption>
   </Wrapper>
  )
}

export default ReviewFilter

const Wrapper = styled.div`
   width: 90%;  
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin-bottom: 10px;
`

const CourseDropdown = styled.select`
   width: 50%;
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
   width: 20%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;


   &:hover {
      background-color: #f1f1f1;
   }
`

const OrderOption = styled.select`
   width: 30%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;

   &:hover {
      background-color: #f1f1f1;
   }
`

