import styled from "styled-components"

interface StudentFilterProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
}

const StudentFilter = ({ searchTerm, onSearchChange }: StudentFilterProps) => {
   return (
      <Wrapper id="filter-container-wrapper">
         <SearchInput 
         type="text"
         placeholder="이름" 
         value={searchTerm}
         onChange={(e) => onSearchChange(e.target.value)} //입력할때마다 상위 컴포넌트로 검색어 전달
         />
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
