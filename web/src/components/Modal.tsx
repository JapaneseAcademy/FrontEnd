import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAdminStudents } from "../apis/adminAPI/adminStudentsAPI";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
}

type Student = {
   id: number;
   name: string;
   birth: string;
   phone: string;
   note: string;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
   const [students, setStudents] = useState<Student[]>([]);
   const [selectedStudentId, setSelectedStudentId] = useState<number | null>(1);

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
            <AddButton>등록</AddButton>
         </ModalContainer>
      </Overlay>
   );
};

export default Modal;

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
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   gap: 20px;
   // 넘칠시 스크롤 가능 
   overflow-y: auto;
   max-height: 80vh;
   width: 60%;
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


//////students table/////

const StudentsTable = styled.div`
   width: 90%;
   display: flex;
   height: 80%;
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