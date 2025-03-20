import styled from "styled-components"

type student = {
   studentId: number;
   name: string;
   phone: string;
   paymentDate: string;
}

interface StudentsTableProps {
   students: student[];
}

const StudentsTable = ({ students }: StudentsTableProps) => {
   return (
      <Wrapper id='students-table-wrapper'>
         <TableHeader>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
            {/* <TableHeaderItem>강의유형</TableHeaderItem> */}
            <TableHeaderItem>결제일</TableHeaderItem>
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
               students.map((student, index) => (
                  <TableRow key={index}>
                     <TableItem>{student.name}</TableItem>
                     <TableItem>{student.phone}</TableItem>
                     {/* <TableItem>현장강의</TableItem> */}
                     <TableItem>{student.paymentDate}</TableItem>
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
   width: 40%;
   padding: 10px;
   font-size: 0.9rem;
   font-weight: 600;
   color: #333;
   text-align: center;
   border-right: 1px solid #e0e0e0;

   //첫번째 item style
   &:first-child {
      width: 20%;
   }
   &:last-child {
      width: 30%;
      border-right: none;
   }
`

const TableBody = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

const TableRow = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #e0e0e0;

   //마지막 row style
   &:last-child {
      border-bottom: none;
   }
`

const TableItem = styled.div`
   width: 40%;
   padding: 10px;
   font-size: 0.9rem;
   color: #333;
   text-align: center;
   border-right: 1px solid #e0e0e0;

   //첫번째 item style
   &:first-child {
      width: 20%;
   }
   &:last-child {
      width: 30%;
      border-right: none;
   }
`
