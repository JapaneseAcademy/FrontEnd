import styled from "styled-components"
import TimeDropDown from "./TimeDropDown";

interface TimeTableDropDownsProps {
   setSelectedDay: (day: string) => void;
   setSelectedStartTime: (time: string) => void;
   setSelectedEndTime: (time: string) => void;
}

const TimeTableDropDowns = ({ setSelectedDay, setSelectedStartTime, setSelectedEndTime }: TimeTableDropDownsProps) => {

   const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDay(e.target.value);
   }
   const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
      if (type === "start") {
         setSelectedStartTime(e.target.value);
      } else {
         setSelectedEndTime(e.target.value);
      }
   }


   return (
      <>
         <DayDropDown onChange={handleDayChange}>
            <option value="">선택</option>
            {/* 월부터 일까지 */}
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
               <option key={day} value={day}>
                  {day}
               </option>
            ))}
         </DayDropDown>
         <TimeDropDown id="start" handleTimeChange={(e) => handleTimeChange(e, "start")}/>
         <TimeDropDown id="end" handleTimeChange={(e) => handleTimeChange(e, "end")}/>
      </>
   )
}

export default TimeTableDropDowns

const DayDropDown = styled.select`
   width: 33%;
   padding: 5px;
   border: 1px solid #e0e0e0;
   border-radius: 5px;
   font-size: 0.9rem;
   outline: none;
   color: #4d4d4d;   

   //hover
   &:hover {
      background-color: #f9f9f9;
   }
`;
