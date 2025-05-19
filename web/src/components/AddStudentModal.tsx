import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAdminStudents } from "../apis/adminAPI/adminStudentsAPI";
import { addStudentToCourse } from "../apis/adminAPI/adminTimeTableAPI";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;

   timeTableId: number | null;
   courseTitle: string;
   courseTime: string;
}

type Student = {
   id: number;
   name: string;
   birth: string;
   phone: string;
   note: string;
}

const AddStudentModal = ({ isOpen, onClose, timeTableId, courseTitle, courseTime }: ModalProps) => {
   const [students, setStudents] = useState<Student[]>([]);
   const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
   const [selectedCourseType, setSelectedCourseType] = useState<string>('');
   const [paymentAmount, setPaymentAmount] = useState<string>(""); // ✅ 초기값을 ""(빈 문자열)로 설정
   const [paymentMethod, setPaymentMethod] = useState<string>('');
   const [paymentDate, setPaymentDate] = useState<string>('');

   // 학생 추가 버튼 클릭 시
   const handleAdd = () => {
         // 선택한 학생이 없으면 리턴
         if (!selectedStudentId) {
            alert("학생을 선택해주세요.");
            return;
         }
         //모든 정보를 입력하지 않았으면 리턴
         //강의 유형 선택 안했을 때
         if (!selectedCourseType) {
            alert("강의 유형을 선택해주세요.");
            return;
         }
         if (!paymentAmount || !paymentDate) {
            alert("결제금액과 결제일을 입력해주세요.");
            return;
         }
         //결제수단 입력 안했을 때
         if (!paymentMethod) {
            alert("결제수단을 입력해주세요.");
            return;
         }
         //확인창 띄우기
         

         if (confirm("선택한 학생을 분반에 등록하시겠습니까?")) {
            if(!timeTableId) {
               alert("분반을 선택해주세요.");
               return;
            }
            // 학생 수동 등록 api 호출
            addStudentToCourse(timeTableId, selectedStudentId, selectedCourseType, parseInt(paymentAmount), paymentMethod, paymentDate);
            // 선택된 값들 초기화
            setSelectedStudentId(null);
            setSelectedCourseType('');
            setPaymentAmount('');
            setPaymentMethod('');
            setPaymentDate('');
            // 모달 닫기
            onClose(); 
         }
   };

   const handleCourseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCourseType(e.target.value);
   };
   const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(e.target.value);
   };
   const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, ""); // 숫자만 허용
      setPaymentAmount(value); // 빈 값이면 "" 유지, 숫자 입력 시 그대로 설정
   };


   const handlePaymentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentDate(e.target.value);
   };

    // 학생들 정보 불러오는 api 호출
   useEffect(() => {
      getAdminStudents().then((data) => {
         setStudents(data);
      }
      );
   }
      , []);

   if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

   return (
      <Overlay onClick={onClose}>
         <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>&times;</CloseButton>

            {/* 모달 내용 */}
            <Left>
               <span style={{fontWeight:'500', fontSize:'1.2rem'}}>전체 학생 목록</span>
               <StudentsTable id='model-students-table'>
                  <TableHeader>
                     <TableHeaderItem>이름</TableHeaderItem>
                     <TableHeaderItem>생년월일</TableHeaderItem>
                     <TableHeaderItem>전화번호</TableHeaderItem>
                  </TableHeader>
                  <TableBody>
                     {students.map((student) => (
                     <TableRow
                        key={student.id}
                        $isselected={student.id === selectedStudentId}
                        onClick={() => setSelectedStudentId(student.id)}
                     >
                        <TableItem>{student.name}</TableItem>
                        <TableItem>{student.birth}</TableItem>
                        <TableItem>{student.phone}</TableItem>
                     </TableRow>
                     ))}
                  </TableBody>
               </StudentsTable>
               <AddButton onClick={handleAdd}>등록</AddButton>
            </Left>
            <Right>
               <InfoRow>
                  <InfoTitle>강의명</InfoTitle>
                  <InfoContent>{courseTitle}</InfoContent>
               </InfoRow>
               <InfoRow>
                  <InfoTitle>분반</InfoTitle>
                  <InfoContent>{courseTime}</InfoContent>
               </InfoRow>
               <InfoRow>
                  <InfoTitle>강의유형</InfoTitle>
                  <InfoDropDown value={selectedCourseType} onChange={handleCourseTypeChange}>
                     <option value="">선택</option>
                     <option value="LIVE">현장강의</option>
                     <option value="ONLINE">온라인</option>
                     <option value="RECORDED">동영상</option>
                     <option value="LIVEONLINE">현장온라인(병행)</option>
                  </InfoDropDown>
               </InfoRow>
               <InfoRow>
                  <InfoTitle>결제금액</InfoTitle>
                  <InfoInput 
                     type="text"
                     placeholder="숫자만 입력해주세요."
                     value={paymentAmount.toString()}
                     onChange={handlePaymentAmountChange}/>
               </InfoRow>
               <InfoRow>
                  <InfoTitle>결제수단</InfoTitle>
                  <InfoInput 
                     type="text"
                     placeholder="ex. 카드결제, 계좌이체"
                     value={paymentMethod}
                     onChange={handlePaymentMethodChange}/>
               </InfoRow>
               <InfoRow>
                  <InfoTitle>결제일</InfoTitle>
                  <InfoInput
                     type="date"
                     placeholder="20xx-xx-xx"
                     value={paymentDate}
                     onChange={handlePaymentDateChange}
                  />
               </InfoRow>
            </Right>
         </ModalContainer>
      </Overlay>
   );
};

export default AddStudentModal;

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
   padding: 20px;
   border-radius: 10px;
   min-width: 300px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
   position: relative;
   display: flex;
   flex-direction: row;
   align-items: center;
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

const Left = styled.div`
   width: 50%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   gap: 20px;
`
const Right = styled.div`
   width: 50%;
   height: 80%;
   display: flex; 
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 30px;
`

//////students table/////

const StudentsTable = styled.div`
   width: 100%;
   display: flex;
   height: 82%;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   border: 1px solid #e1e1e1;

`

const TableHeader = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 10px;
   background-color: #d7d7d7;
   font-size: 1rem;
   font-weight: 500;
`
const TableHeaderItem = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;


   //id에 따라서 width 조절
   width: 30%;
   &:nth-child(1) {
      width: 20%;

      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(2) {
      width: 30%;
         border-right: 1px solid #e1e1e1;

   }
   &:nth-child(3) {
      width: 50%;
   }
`

const TableBody = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   font-size: 0.9rem;

   //넘어가면 스크롤 가능하도록
   overflow-y: scroll;
   height: 100%;
` 
const TableRow = styled.div<{ $isselected: boolean }>`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 10px;
   padding-top: 9px;
   padding-bottom: 9px;
   border-bottom: 1px solid #e1e1e1;
   cursor: pointer;
   background-color: ${({ $isselected }) => ($isselected ? "#e6f7ff" : "transparent")}; 
   
   &:hover {
      background-color: ${({ $isselected }) => ($isselected ? "#cceeff" : "#f1f1f1")}; 
   }

   //마지막 row는 border 없애기
   &:last-child {
      border-bottom: none;
   }
`;

const TableItem = styled.div`
   width: 30%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;

      //id에 따라서 width 조절
      width: 30%;
   &:nth-child(1) {
      width: 20%;
      border-right: 1px solid #e1e1e1;
   }
   &:nth-child(2) {
      width: 30%;
      border-right: 1px solid #e1e1e1;

   }
   &:nth-child(3) {
      width: 50%;
   }
`

///////
const AddButton = styled.button`
   padding: 10px;
   background-color: #3d3d3d;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s; 
   &:hover {
      background-color: #111111;
   }
`

///RIGHT SIDE///
const InfoRow = styled.div`
   width: 90%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`

const InfoTitle = styled.div`
   font-size: 1rem;
   font-weight: 500;
`

const InfoContent = styled.div`
   width: 70%;
   border: 1px solid #e1e1e1;
   background-color: #f5f5f5;
   padding: 8px;
   border-radius: 5px;
   font-size: 0.9rem;
   font-weight: 400;
`

const InfoDropDown = styled.select`
   width: 70%;
   padding: 8px;
   font-size: 0.9rem;
   border: 1px solid #e1e1e1;
   border-radius: 5px;
   
   //hover
   &:hover {
      border: 1px solid #636363;
   }
`

const InfoInput = styled.input`
   width: 70%;
   border: 1px solid #e1e1e1;
   padding: 8px;
   border-radius: 5px;
   font-size: 0.9rem;
   font-weight: 400;
`