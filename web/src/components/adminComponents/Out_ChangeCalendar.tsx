import styled from "styled-components"
import { useEffect, useState } from "react"
import { changeAdminCalendar, getCalendar } from "../../apis/adminAPI/adminCalendarAPI";

const Out_ChangeCalendar = () => {
   const [calendarImage, setCalendarImage] = useState<string>('/images/no-image.png');
   //업로드용 상태
   const [uploadImage, setUploadImage] = useState<File>();

   //미리보기로 이미지 보여주기
   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setCalendarImage(reader.result as string);
      }
   }
   //진짜로 이미지 업로드
   const handlePhotoUpload = () => {
      
      //진짜로 바꿀건지 confirm
      if(confirm('캘린더 이미지를 변경하시겠습니까?')) {
         changeAdminCalendar(uploadImage!);
      }
   }

   useEffect(() => {
      // 캘린더 이미지 가져오기
      getCalendar().then((data) => {     
         setCalendarImage(data[0]);
      });
   }, []);


   return (
      <Wrapper>
         <CalendarImageContainer>
               <CalendarImage src={typeof calendarImage === 'string' ? calendarImage : ''}/>
               <PhotoUploadButton>
               <label htmlFor="photoInput" style={{display:'flex', gap:'5px'}}>
                  사진 변경
               </label>
               <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                     if (!e.target.files) return;
                     setUploadImage(e.target.files[0]);
                     handlePhotoChange(e);
                  }
                  }
               />
            </PhotoUploadButton>
         </CalendarImageContainer>
         <CalendarFormContainer>
            <ChangeBtn onClick={handlePhotoUpload}>변경하기</ChangeBtn>
         </CalendarFormContainer>
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

const CalendarImageContainer = styled.div`
   width: 70%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 10px;
`

const CalendarFormContainer = styled.div`
   height: 100%;
   width: 30%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background-color: white;
   border: 1px solid #dbdbdb;
   gap: 10px;
`


const CalendarImage = styled.img`
   width: 50%;
   aspect-ratio: 1/1;
   object-fit: cover;
   
   border: 1px solid #dbdbdb;
`

const ChangeBtn = styled.button`
   width: 80%;
   height: 40px;
   background-color: #564000;
   border: none;
   color: white;
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