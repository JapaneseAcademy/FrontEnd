import { useEffect, useState } from "react";
import styled from "styled-components";
import TimeTableDropDowns from "./adminComponents/etc/TimeTableDropDowns";
import { getAdminCourseInfoTitles } from "../apis/adminAPI/adminReviewAPI";
import { createTimetable } from "../apis/adminAPI/adminTimeTableAPI";
import { convertTimeToFull, convertWeekdayToEng } from "../utils/utils";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
}

type TimeBlock = {
   weekday: string;
   startTime: string;
   endTime: string;
}

type courseInfo = {
   courseInfoId: number;
   title: string;
}

const AddTimeTableModal = ({ isOpen, onClose}: ModalProps) => {
   //courseInfos
   const [courseInfos, setCourseInfos] = useState<courseInfo[]>([]);

   const [isAddMode, setIsAddMode] = useState<boolean>(false);
   const [selectedCourseInfoId, setSelectedCourseInfoId] = useState<number>(0);
   const [selectedYear, setSelectedYear] = useState<string>("0");
   const [selectedMonth, setSelectedMonth] = useState<string>("0");
   const [selectedDay, setSelectedDay] = useState<string>("");
   const [selectedStartTime, setSelectedStartTime] = useState<string>("");
   const [selectedEndTime, setSelectedEndTime] = useState<string>("");
   const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

   const handleAddTimeBlock = () => {

      if (isAddMode) {
         //예외처리
         // 요일, 시작시간, 종료시간 중 하나라도 빈 값이면 추가하지 않음
         if (selectedDay === "" || selectedStartTime === "" || selectedEndTime === "") {
            alert("요일, 시작 시간, 종료 시간을 모두 선택해주세요.");
            return;
         }
         // 시작시간이 종료시간보다 늦으면 추가하지 않음
         // if (selectedStartTime >= selectedEndTime) {
         //    console.log(selectedStartTime, selectedEndTime);
         //    alert("종료 시간은 시작 시간보다 늦어야 합니다.");
         //    return;
         // }
         
         setTimeBlocks([...timeBlocks, { weekday: selectedDay, startTime: selectedStartTime, endTime: selectedEndTime }]);
      }
      setIsAddMode(!isAddMode);
   }

   //상태 모두 초기화하는 함수
   const handleClose = () => {
      setSelectedDay("월");
      setSelectedStartTime("");
      setSelectedEndTime("");
      setTimeBlocks([]);
      setIsAddMode(false);
      onClose();
   }

   // 분반 등록하는 함수
   const handleAddTimeTable = () => {
      if (selectedCourseInfoId === 0) {
         alert("강의를 선택해주세요.");
         return;
      }
      if (timeBlocks.length === 0) {
         alert("시간표를 추가해주세요.");
         return;
      }
      if (selectedYear === "0" || selectedMonth === "0") {
         alert("년/월을 선택해주세요.");
         return;
      }

      if (confirm("분반을 추가하시겠습니까?")) {
         //timeBlocks내의 모든 weekday를 영어로 바꾸고, 시간 뒤에 00 붙이기
         timeBlocks.forEach((block) => {
            block.weekday = convertWeekdayToEng(block.weekday);
            block.startTime = convertTimeToFull(block.startTime);
            block.endTime = convertTimeToFull(block.endTime);
         });

         createTimetable(selectedCourseInfoId, `${selectedYear}-${selectedMonth}`, timeBlocks).then((result) => {
            if (result) {
               handleClose();
            }
         })
      }
   }

   //courseInfos 세팅
   useEffect(() => {
      getAdminCourseInfoTitles().then((data) => {
         setCourseInfos(data);
      });
   }
   , []);

   // 분반 추가 값들 확인
   useEffect(() => {
      console.log("selectedCourseInfoId: ", selectedCourseInfoId,
      "selectedYear: ", selectedYear,
      "date: ", `${selectedYear}-${selectedMonth}`,
      "timeBlocks: ", timeBlocks);
   }
   , [selectedCourseInfoId, selectedYear, selectedMonth, timeBlocks]);
      

   if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

   return (
      <Overlay onClick={handleClose}>
         <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose}>&times;</CloseButton>

            {/* 모달 내용 */}
            <Title>분반 추가</Title>
            <FormContainer>
               <FormRow>
                  <FormLabel>강의</FormLabel>
                  <CourseInfoDropDown onChange={(e) => setSelectedCourseInfoId(parseInt(e.target.value))}>
                     <option value={0}>강의 선택</option>
                     {courseInfos.map((courseInfo) => (
                        <option key={courseInfo.courseInfoId} value={courseInfo.courseInfoId}>
                           {courseInfo.title}
                        </option>
                     ))}
                  </CourseInfoDropDown>
               </FormRow>
               <FormRow>
                  <FormLabel>년 / 월</FormLabel>
                  <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
                     <YearDropDown onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="0">선택</option>
                        <option value="2025">2025</option>
                     </YearDropDown>
                     <MonthDropDown onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="0">선택</option>
                        {/* 1부터 12까지 */}
                        {[...Array(12)].map((_, i) => {
                           const value = (i + 1).toString().padStart(2, '0');
                           return (
                              <option key={value} value={value}>
                                 {value}
                              </option>
                           );
                        })}
                     </MonthDropDown>
                  </div>
               </FormRow>
               <FormLabel>시간표</FormLabel>
               <TimeBlocksContainer>
                  <TimeBlocks>
                     <TimeBlockHeader>
                        <div>요일</div>
                        <div>시작 시간</div>
                        <div>종료 시간</div>
                     </TimeBlockHeader>

                     {timeBlocks.map((block, index) => (
                        <TimeBlock key={index}>
                           <div>{block.weekday}</div>
                           <div>{block.startTime}</div>
                           <div>{block.endTime}</div>
                        </TimeBlock>
                     ))}

                     {/* isAddMode일때만 나타나게 */}
                     { isAddMode && (
                     <TimeBlock>
                        <TimeTableDropDowns setSelectedDay={setSelectedDay} setSelectedStartTime={setSelectedStartTime} setSelectedEndTime={setSelectedEndTime} />
                     </TimeBlock> )}

                  </TimeBlocks>
                  <AddTimeBlockBtn onClick={handleAddTimeBlock} $isAddmode={isAddMode}> 
                     {isAddMode ? "완료" : "+ 추가"}
                     </AddTimeBlockBtn>
               </TimeBlocksContainer>
            </FormContainer>
            <AddBtn onClick={handleAddTimeTable}>등록</AddBtn>

         </ModalContainer>
      </Overlay>
   );
};

export default AddTimeTableModal;

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ModalContainer = styled.div`
   background: white;
   padding: 30px;
   border-radius: 10px;
   min-width: 300px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   gap: 20px;

   /* max-height: 80vh; */
   width: 80%;
   height: 80%;
`;

const CloseButton = styled.button`
   position: absolute;
   top: 10px;
   right: 15px;
   font-size: 1.5rem;
   border: none;
   background: none;
   cursor: pointer;
`;


////
const Title = styled.div`
   font-size: 1.3rem;
   font-weight: 500;
`;

const FormContainer = styled.div`
   width: 100%;
   height: 100%;
   padding: 30px;
   display: flex;
   flex-direction: column;
   gap: 15px;
   border: 1px solid #e0e0e0;
`;

const FormRow = styled.div`
   height: 30px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

const FormLabel = styled.label`
   font-size: 1rem;
   font-weight: 500;
`;

const CourseInfoDropDown = styled.select`
   width: 70%;
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

const YearDropDown = styled.select`
   width: 48%;
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
const MonthDropDown = styled.select`
   width: 48%;
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

const TimeBlocksContainer = styled.div`
   width: 100%;
   height: 100%;
   padding: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   gap: 15px;
   border: 1px solid #e0e0e0;
`;

const TimeBlocks = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   gap: 10px;
`;

const AddTimeBlockBtn = styled.button<{ $isAddmode: boolean }>`
   width: 100%;
   padding: 8px;
   color: ${(props) => (props.$isAddmode ? "#ffffff" : "#818181")};
   background-color: ${(props) => (props.$isAddmode ? "#818181" : "white")};
   border: 1px solid #e0e0e0;
   border-radius: 5px;
   cursor: pointer;
   font-size: 0.8rem;

   &:hover {
      background-color: ${(props) => (props.$isAddmode ? "#b8b8b8" : "#f9f9f9")};
   }
`;

const TimeBlockHeader = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-evenly;
   gap: 10px;
   font-size: 0.9rem;
   font-weight: 500;
   border-bottom: 1px solid #e0e0e0;
   padding: 5px 15px;
`;

const TimeBlock = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-evenly;
   gap: 10px;
   font-size: 0.9rem;
   font-weight: 400;
   color: #606060;
   padding: 5px 0;
`;



///
const AddBtn = styled.button`
   width: 100%;
   padding: 10px;
   background-color: #545454;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   font-size: 1rem;
   font-weight: bold;

`

