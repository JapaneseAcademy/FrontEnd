import styled from "styled-components"
import { addHyphenToPhoneNumber, convertCategory } from "../../../utils/utils";
import { deleteStudent } from "../../../apis/adminAPI/adminTimeTableAPI";

type student = {
   enrollmentId: number;
   name: string;
   phone: string;
   paymentDate: string;
   category: string;
}

interface StudentsTableProps {
   students: student[];
}


const StudentsTable = ({ students }: StudentsTableProps) => {

   //수강생 삭제하는 함수
   const handleDeleteStudent = (enrollmentId: number, name: string) => {
      //삭제할건지 confirm
      if (confirm(`[ ${name} ] 수강생을 삭제하시겠습니까? \n삭제한 수강생은 되돌릴 수 없으며, 리뷰를 작성했을 경우 리뷰도 함께 삭제됩니다.`)) {
         deleteStudent(enrollmentId);
      }
   };
   
   return (
      <Wrapper id='students-table-wrapper'>
         <TableHeader>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
            <TableHeaderItem>강의유형</TableHeaderItem>
            <TableHeaderItem>결제일</TableHeaderItem>
            <TableHeaderItem></TableHeaderItem>
         </TableHeader>
         <TableBody>
            {/* students가 없을때 */}
            {students.length === 0 ? (
               <TableRow key='no-student'>
                  <TableItem style={{ width: '100%', color: '#737373' }}>
                     수강생이 없습니다.
                  </TableItem>
               </TableRow>
            ) : (
               students.map((student) => (
                  <TableRow
                     key={student.enrollmentId}
                  >
                     <TableItem>{student.name}</TableItem>
                     <TableItem>{addHyphenToPhoneNumber(student.phone)}</TableItem>
                     <TableItem>{convertCategory(student.category)}</TableItem>
                     <TableItem>{student.paymentDate}</TableItem>
                     <TableItem><DeleteButton onClick={()=>handleDeleteStudent(student.enrollmentId, student.name)}>삭제</DeleteButton></TableItem>
                  </TableRow>
               ))
            )}
         </TableBody>
      </Wrapper>
   );
};


export default StudentsTable

const Wrapper = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid #e0e0e0;
   margin-bottom: 30px;
   margin-top: 10px;
   border-radius: 5px;
`

const TableHeader = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   background-color: #f0f0f0;
`

const TableHeaderItem = styled.div`
   width: 30%;
   padding: 10px 0;
   font-size: 0.9rem;
   font-weight: 600;
   color: #333;
   display: flex;
   justify-content: center;
   align-items: center;
   border-right: 1px solid #e0e0e0;

   &:first-child {
      width: 15%;
   }
   &:nth-child(2) {
      width: 30%;
   }
   &:nth-child(3) {
      width: 20%;
   }
   &:nth-child(4) {
      width: 30%;
   }
   &:last-child {
      width: 10%;
      border-right: none;
   }
`
const TableItem = styled.div`
   width: 30%;
   padding: 10px 0;
   font-size: 0.9rem;
   color: #333;
   display: flex;
   justify-content: center;
   align-items: center;
   border-right: 1px solid #e0e0e0;

   &:first-child {
      width: 15%;
   }
   &:nth-child(2) {
      width: 30%;
   }
   &:nth-child(3) {
      width: 20%;
   }
   &:nth-child(4) {
      width: 30%;
   }
   &:last-child {
      width: 10%;
      border-right: none;
   }

   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`

const DeleteButton = styled.button`
   width: 100%;
   height: 100%;
   color: #a8a8a8;
   background-color: transparent;
   border: none;
   text-decoration: underline;

   font-size: 0.8rem;
   cursor: pointer;
`


const TableBody = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

interface TableRowProps {
   $selected?: boolean;
}

const TableRow = styled.div<TableRowProps>`
   width: 100%;
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #e0e0e0;
   background-color: ${({ $selected }) => ($selected ? "#dbeafe" : "transparent")};
   font-weight: ${({ $selected }) => ($selected ? "bold" : "normal")};
   border-radius: ${({ $selected }) => ($selected ? "5px" : "0")};

   &:last-child {
      border-bottom: none;
   }
`
