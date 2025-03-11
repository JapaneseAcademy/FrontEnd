import { useState } from "react";
import styled from "styled-components"
import { sendAdminMessage } from "../../../apis/adminAPI/adminMessageAPI";

type Student = {
   id: number;
   name: string;
   birth: string;
   phone: string;
   note: string;
}

interface SendMessageContainerProps {
   students: Student[];
}

const SendMessageContainer = ({ students }: SendMessageContainerProps) => {
   const [message, setMessage] = useState("");

   const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
   }

   const handleSend = () => {
      console.log("메시지: ", message);
      console.log("보낼 학생 id 리스트: ", students.map((student) => student.id));

      if (confirm("메시지를 전송하시겠습니까?")) {
         const titleAddedMessage = `[예리한 일본어] ${message}`;
         sendAdminMessage(titleAddedMessage, students.map((student) => student.id));
      }
   }

   return (
      <Wrapper>
         <PhoneShape>
            <Title>내용</Title>
            <Message  
               placeholder="메시지를 입력하세요(최대 800자)"
               value={message}
               onChange={handleMessageChange}
               maxLength={800} 
            />
            <SendButton onClick={handleSend}>전송</SendButton>

            <TargetStudents>
               <Title>보낼 학생</Title>
               <StudentTable>
                  { students.length === 0 && <div style={{color:'#6a6a6a', fontSize:'0.9rem', margin:'10px 0'}}>보낼 학생을 선택해주세요.</div> }
                  {students.map((student) => (
                     <StudentRow key={student.id}>
                        <Name>{student.name}</Name>
                        <Phone>{student.phone}</Phone>
                     </StudentRow>
                  ))}
               </StudentTable>
            </TargetStudents>
         </PhoneShape>
      </Wrapper>
   )
}

export default SendMessageContainer

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   background-color: #f8f8f8;
   width: 40%;
   height: 100%;
   /* border-right: 1px solid #e1e1e1; */

`

const Title = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   font-weight: 500;
   font-size: 1.2rem;
`

const PhoneShape = styled.div`
   width: 90%;
   height: 100%;
   min-height: 500px; 
   background-color: #ffffff;
   border: 1px solid #e1e1e1;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   padding: 20px;
   gap: 10px;
   overflow-y: auto;
`;

const Message = styled.textarea`
   width: 100%;
   min-height: 300px;
   height: auto; /* ✅ 내용이 많아지면 자동 확장 */
   max-height: 300px; /* ✅ 너무 커지지 않도록 제한 */
   flex-grow: 1; /* ✅ 부모 컨테이너 크기에 맞춰 확장 */
   padding: 20px;
   border: 1px solid #e1e1e1;
   border-radius: 10px;
   font-size: 1rem;
   font-family: 'Pretendard';
   resize: none;
   outline: none;
   background-color: #f8f8f8;
   color: #000000;
   overflow-y: auto; 
   ::placeholder {
      color: #c4c4c4;
   }
   &:focus {
      border: 1px solid #5f5f5f;
   }
`;

const SendButton = styled.button`
   width: 20%;
   padding: 10px 5px;
   border: none;
   border-radius: 5px;
   background-color: #5f5f5f;
   color: #ffffff;
   font-size: 0.8rem;
   margin-bottom: 40px;
   align-self: flex-end;

   cursor: pointer;
   &:hover {
      background-color: #4f4f4f;    
   }
`

const TargetStudents = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   gap: 10px;
`

//표
const StudentTable = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   border: 1px solid #e1e1e1;
   border-radius: 10px;

   //넘치면 스크롤
   overflow-y: auto;
   ::-webkit-scrollbar {
      width: 10px;
   }
   ::-webkit-scrollbar-thumb {
      background-color: #c4c4c4;
      border-radius: 10px;
   }
   ::-webkit-scrollbar-track {
      background-color: #f8f8f8;
   }
`

//표 행
const StudentRow = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;       
   align-items: center;
   justify-content: space-between;
   padding: 10px 15px;
   border-bottom: 1px solid #e1e1e1;

   //맨 마지막 행은 border-bottom 없애기
   &:last-child {
      border-bottom: none;
   }
`

const Name = styled.div`
   font-size: 0.9rem;  
`

const Phone = styled.div`
   font-size: 0.9rem;
   color: #7a7a7a;
`