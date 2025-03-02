import styled from "styled-components"

const StudentFilter = () => {
   return (
      <Wrapper id="filter-container-wrapper">
         <SearchInput placeholder="이름" />
      </Wrapper>
   )
}

export default StudentFilter

const Wrapper = styled.div`
   width: 90%;  
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin-bottom: 10px;
`


const SearchInput = styled.input`
   width: 25%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;


   &:hover {
      background-color: #f1f1f1;
   }
`
