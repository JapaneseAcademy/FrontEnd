import { useEffect, useState } from "react";
import styled from "styled-components"

interface TimeDropDownProps {
   id: string;
   handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>, type: string) => void;
}

const TimeDropDown = ({ id, handleTimeChange }: TimeDropDownProps) => {
   const [selectedHour, setSelectedHour] = useState<string>("");
   const [selectedMinute, setSelectedMinute] = useState<string>("");

   //hour과 minute을 하나의 문자열로 합치는 함수
   const combineTime = (hour: string, minute: string) => {
      if (hour === "" || minute === "") {
         return "";
      }
      const formattedHour = hour.padStart(2, '0'); // 시간을 2자리로 포맷팅
      const formattedMinute = minute.padStart(2, '0'); // 분을 2자리로 포맷팅
      return `${formattedHour}:${formattedMinute}`;
   }

   // 시간이 바뀔때마다 부모 컴포넌트로 전달
   useEffect(() => {
      handleTimeChange({ target: { value: combineTime(selectedHour, selectedMinute) } } as React.ChangeEvent<HTMLSelectElement>, id);
   }
   , [selectedHour, selectedMinute]);

   return (
      <Wrapper id={id}>
      <HourDropDown onChange={(e) => setSelectedHour(e.target.value)}>
         <option value="">선택</option>
         {/* 0부터 23까지 */}
         {[...Array(24)].map((_, i) => {
            const displayValue = i.toString().padStart(2, '0');
            return (
               <option key={i} value={i}>
                  {displayValue}
               </option>
            );
         })}
      </HourDropDown>
      <div>:</div>
      <MinuteDropDown onChange={(e) => setSelectedMinute(e.target.value)}>
         <option value="">선택</option>
         {/* 0부터 59까지, 5분 단위로 */}
         {[...Array(12)].map((_, i) => {
            const value = i * 5;
            const displayValue = value.toString().padStart(2, '0');
            return (
               <option key={value} value={value}>
                  {displayValue}
               </option>
            );
         })}
      </MinuteDropDown>
   </Wrapper>
   )
}

export default TimeDropDown

const Wrapper = styled.div`
   width: 33%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   gap: 10px;
   
   font-size: 0.8rem;
`;
const HourDropDown = styled.select`
   width: 50%;
   padding: 5px;
   border: 1px solid #e0e0e0;       
   border-radius: 5px;
   outline: none;
   color: #4d4d4d;   

   //hover
   &:hover {
      background-color: #f9f9f9;
   }
`;
const MinuteDropDown = styled.select`
   width: 50%;
   padding: 5px;
   border: 1px solid #e0e0e0;       
   border-radius: 5px;
   outline: none;
   color: #4d4d4d;   

   //hover
   &:hover {
      background-color: #f9f9f9;
   }
`;