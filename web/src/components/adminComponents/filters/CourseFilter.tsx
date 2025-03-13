import styled from "styled-components"

interface CourseFilterProps {
   handleYearChange: (year: string) => void;
   handleMonthChange: (month: string) => void;
   selectedYear: string;
   selectedMonth: string;
}
   
   const CourseFilter = ({ handleYearChange, handleMonthChange, selectedYear, selectedMonth }: CourseFilterProps) => {
      return (
      <Wrapper id="filter-container-wrapper">
         <Dropdown id="year-dropdown" value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
            <option value="2025">2025</option>
         </Dropdown>
         <Text>년</Text>
         <Dropdown id="month-dropdown" value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)}>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
         </Dropdown>
         <Text>월</Text>
      </Wrapper>
      );
   };
   
export default CourseFilter;


const Wrapper = styled.div`
   width: 90%;  
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin-bottom: 10px;
`

const Dropdown = styled.select`
   width: 20%;
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

const Text = styled.span`
   margin: 0 5px;
   font-size: 0.9rem;
   color: #333;
`
