import styled from "styled-components";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;


}

const AddTimeTableModal = ({ isOpen, onClose}: ModalProps) => {


   if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

   return (
      <Overlay onClick={onClose}>
         <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>&times;</CloseButton>

            {/* 모달 내용 */}
            <Title>분반 추가</Title>
            <FormContainer>
               <FormRow>
                  <FormLabel>강의</FormLabel>
                  <CourseInfoDropDown>
                     <option value="1">고수들의 회화비밀</option>
                     <option value="2">원샷반1</option>
                     <option value="3">원샷반2</option>
                  </CourseInfoDropDown>
               </FormRow>
               <FormRow>
                  <FormLabel>년 / 월</FormLabel>
                  <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
                     <YearDropDown>
                        <option value="2025">2025</option>
                     </YearDropDown>
                     <MonthDropDown>
                        {/* 1부터 12까지 */}
                        {[...Array(12)].map((_, i) => (
                           <option key={i} value={i + 1}>
                              {i + 1}
                           </option>
                        ))}
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
                     <TimeBlock>
                        <div>월</div>
                        <div>09:00</div>
                        <div>10:00</div>
                     </TimeBlock>
                     <TimeBlock>
                        <div>월</div>
                        <div>09:00</div>
                        <div>10:00</div>
                     </TimeBlock>
                  </TimeBlocks>
                  <AddTimeBlockBtn>+ 추가</AddTimeBlockBtn>
               </TimeBlocksContainer>
            </FormContainer>
            <AddBtn>등록</AddBtn>

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

const AddTimeBlockBtn = styled.button`
   width: 100%;
   padding: 8px;
   color: #4d4d4d;
   background-color: white;
   border: 1px solid #e0e0e0;
   border-radius: 5px;
   cursor: pointer;
   font-size: 0.8rem;

   &:hover {
      background-color: #f9f9f9;
   }
`;

const TimeBlockHeader = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
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
   justify-content: space-between;
   gap: 10px;
   font-size: 0.9rem;
   font-weight: 400;
   color: #606060;
   padding: 5px 15px;
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