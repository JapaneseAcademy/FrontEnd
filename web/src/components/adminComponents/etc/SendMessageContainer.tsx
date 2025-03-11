import styled from "styled-components"

const SendMessageContainer = () => {
   return (
      <Wrapper>
         <PhoneShape>
            <Title>내용</Title>
            <Message placeholder="메시지를 입력하세요(최대 500자)" />

            <TargetStudents>
               <Title>보낼 사람</Title>
               <StudentTable>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김철수</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>김영희</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
                  <StudentRow>
                     <Name>홍길동</Name>
                     <Phone>010-4303-9511</Phone>
                  </StudentRow>
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
   margin-bottom: 20px;
`;


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
   padding: 10px;
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