import styled from "styled-components"
import { useEffect, useState } from "react"
import { changeAdminCalendar, getCalendars } from "../../apis/adminAPI/adminCalendarAPI";

type calendar = {
   instructorId: number;
   calendarUrl: string;
};

const Out_ChangeCalendar = () => {
   const [calendars, setCalendars] = useState<calendar[]>([]);
   // 각 강사별 업로드 이미지 상태 관리
   const [uploadImages, setUploadImages] = useState<{ [key: number]: File | undefined }>({});

   // 이미지 업로드 및 변경
   const handlePhotoUpload = (instructorId: number) => {
      const file = uploadImages[instructorId];
      if (!file) {
         alert('변경할 달력 이미지를 업로드 해주세요.');
         return;
      }
      if(confirm(`강사 ${instructorId}의 캘린더 이미지를 변경하시겠습니까?`)) {
         changeAdminCalendar(file, instructorId);
      }
   }

   useEffect(() => {
      // 캘린더 이미지 가져오기
      getCalendars().then((data) => {     
         if (data) {
            setCalendars(data);
         } else {
            console.error("캘린더 이미지 데이터를 가져오지 못했습니다.");
         }
      });
   }, []);

   return (
      <Wrapper>
         <CalendarsContainer>
            {calendars.map((calendar) => (
               <Canlendar key={calendar.instructorId}>
                  <CalendarImage
                     src={calendar.calendarUrl}
                     alt={`캘린더 이미지 ${calendar.instructorId}`}
                  />
                  <PhotoUploadButton htmlFor={`photoInput-${calendar.instructorId}`}>
                     사진 업로드
                     <input
                        id={`photoInput-${calendar.instructorId}`}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                           if (!e.target.files) return;
                           const file = e.target.files[0];
                           const reader = new FileReader();
                           reader.readAsDataURL(file);
                           reader.onload = () => {
                              setCalendars((prev) =>
                                 prev.map((c) =>
                                    c.instructorId === calendar.instructorId
                                       ? { ...c, calendarUrl: reader.result as string }
                                       : c
                                 )
                              );
                           };
                           setUploadImages((prev) => ({
                              ...prev,
                              [calendar.instructorId]: file,
                           }));
                        }}
                     />
                  </PhotoUploadButton>
                  <ChangeBtn onClick={() => handlePhotoUpload(calendar.instructorId)}>
                     적용하기
                  </ChangeBtn>
               </Canlendar>
            ))}
         </CalendarsContainer>
      </Wrapper>
   )
}

export default Out_ChangeCalendar

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 10px;
`

const CalendarsContainer = styled.div`
   width: 80%;
   height: 100%;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   gap: 10px;
`
const Canlendar = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 10px;
`

// const CalendarFormContainer = styled.div`
//    height: 100%;
//    width: 20%;
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//    justify-content: center;
//    background-color: white;
//    border: 1px solid #dbdbdb;
//    gap: 10px;
// `


const CalendarImage = styled.img`
   width: 85%;
   aspect-ratio: 1/1;
   object-fit: cover;
   
   border: 1px solid #dbdbdb;
`

const ChangeBtn = styled.button`
   width: 85%;
   height: 40px;
   background-color: #564000;
   border: none;
   color: white;
   font-weight: bold;
   font-size: 14px;
   cursor: pointer;
   border-radius: 5px;

   &:hover {
      background-color: #3a2a00;
   }
`

const PhotoUploadButton = styled.label`
   width: 10%;
   min-width: 100px;
   height: 40px;
   padding: 10px;
   background-color: #dbdbdb;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   font-size: 12px;
   color: white;

   &:hover {
      background-color: #bfbfbf;
   }
`