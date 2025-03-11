import styled from "styled-components"

interface StudentFilterProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
}

const MessageFilter = ({ searchTerm, onSearchChange }: StudentFilterProps) => {
   return (
      <Wrapper id="filter-container-wrapper">
         <Dropdown>
            <option>전체</option>
            <option>원샷반1</option>
            <option>원샷반2</option>
            <option>원샷반3</option>
            <option>고수들의 회화비밀</option>
         </Dropdown>
         <SearchInput 
         type="text"
         placeholder="이름" 
         value={searchTerm}
         onChange={(e) => onSearchChange(e.target.value)} //입력할때마다 상위 컴포넌트로 검색어 전달
         />
      </Wrapper>
   )
}

export default MessageFilter

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
   border: 1px solid black;

`

///Dropdown
const Dropdown = styled.select`
   width: 30%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;
   margin-right: 10px;

   &:hover {
      background-color: #f1f1f1;
   }
`