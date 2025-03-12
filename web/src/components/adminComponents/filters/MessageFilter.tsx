import styled from "styled-components"
import { convertTime, convertWeekday } from "../../../utils/utils";

interface StudentFilterProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
   timeTables: TimeTable[];
   onTimeTableChange: (timeTableId: number) => void; 
}

type TimeTable = {
   timeTableId: number;
   courseTitle: string;
   timeBlocks: TimeBlock[];
 
   students: number[];
 }
 
 type TimeBlock = {
   endTime: string;
   startTime: string;
   weekday: string;
 }

const MessageFilter = ({ searchTerm, onSearchChange, timeTables, onTimeTableChange }: StudentFilterProps) => {

   // courseTitle과 Timeblock을 한 문자열로 합쳐서 변환하는 함수
   const convertTimeTableToString = (timeTable: TimeTable) => {
      const timeBlockString = timeTable.timeBlocks.map((timeBlock) => {
         return `${convertWeekday(timeBlock.weekday)} ${convertTime(timeBlock.startTime)} ~ ${convertTime(timeBlock.endTime)}`;
      }).join(", ");
      return `[${timeTable.courseTitle}] ${timeBlockString}`;
   }

   return (
      <Wrapper id="filter-container-wrapper">
         {/* 🔹 선택된 TimeTable 변경 핸들러 추가 */}
         <Dropdown onChange={(e) => onTimeTableChange(Number(e.target.value))}>
         {timeTables.map((timeTable) => (
            <option key={timeTable.timeTableId} value={timeTable.timeTableId}>
               {convertTimeTableToString(timeTable)}
            </option>
         ))}
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
   width: 30%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;
   border: 1px solid #555555;

`

///Dropdown
const Dropdown = styled.select`
   width: 70%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   font-size: 0.8rem;
   margin-right: 10px;

   &:hover {
      background-color: #f1f1f1;
   }
`