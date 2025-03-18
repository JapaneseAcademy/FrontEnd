import { useEffect, useState } from "react";
import styled from "styled-components"

interface TimeDropDownProps {
   id: string;
   handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>, type: string) => void;
}

const TimeDropDown = ({ id, handleTimeChange }: TimeDropDownProps) => {
   const [selectedHour, setSelectedHour] = useState<number>(0);
   const [selectedMinute, setSelectedMinute] = useState<number>(0);

   //hour과 minute을 하나의 문자열로 합치는 함수
   const combineTime = (hour: number, minute: number) => {
      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
   }

   // 시간이 바뀔때마다 부모 컴포넌트로 전달
   useEffect(() => {
      handleTimeChange({ target: { value: combineTime(selectedHour, selectedMinute) } } as React.ChangeEvent<HTMLSelectElement>, id);
   }
   , [selectedHour, selectedMinute]);

   return (
      <Wrapper id={id}>
      <HourDropDown onChange={(e) => setSelectedHour(parseInt(e.target.value))}>
         {/* 0부터 23까지 */}
         {[...Array(24)].map((_, i) => (
            <option key={i} value={i}>
               {i}
            </option>
         ))}
      </HourDropDown>
      <div>:</div>
      <MinuteDropDown onChange={(e) => setSelectedMinute(parseInt(e.target.value))}>
         {/* 0부터 59까지, 5분 단위로 */}
         {[...Array(12)].map((_, i) => (
            <option key={i * 5} value={i * 5}>
               {i * 5}
            </option>
         ))}
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
`;
const HourDropDown = styled.select`
   width: 50%;
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
const MinuteDropDown = styled.select`
   width: 50%;
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