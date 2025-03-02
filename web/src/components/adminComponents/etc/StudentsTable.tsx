import styled from "styled-components"

const StudentsTable = () => {

   //학생 예시 데이터
   const STUDENTS = [
      {
         studentName: '홍길동',
         phone: '010-1234-5678',
         paymentDate: '2021-01-01',
      },
      {
         studentName: '김철수',
         phone: '010-2345-6789',
         paymentDate: '2021-02-01',
      },
      {
         studentName: '이영희',
         phone: '010-3456-7890',
         paymentDate: '2021-03-01',
      },
      {
         studentName: '박민수',
         phone: '010-4567-8901',
         paymentDate: '2021-04-01',
      },
      {
         studentName: '정미경',
         phone: '010-5678-9012',
         paymentDate: '2021-05-01',
      },
      {
         studentName: '홍길동',
         phone: '010-1234-5678',
         paymentDate: '2021-01-01',
      },
      {
         studentName: '김철수',
         phone: '010-2345-6789',
         paymentDate: '2021-02-01',
      },
      {
         studentName: '이영희',
         phone: '010-3456-7890',
         paymentDate: '2021-03-01',
      },
      {
         studentName: '박민수',
         phone: '010-4567-8901',
         paymentDate: '2021-04-01',
      },
      {
         studentName: '정미경',
         phone: '010-5678-9012',
         paymentDate: '2021-05-01',
      },
      {
         studentName: '홍길동',
         phone: '010-1234-5678',
         paymentDate: '2021-01-01',
      },
      {
         studentName: '김철수',
         phone: '010-2345-6789',
         paymentDate: '2021-02-01',
      },
      {
         studentName: '이영희',
         phone: '010-3456-7890',
         paymentDate: '2021-03-01',
      },
      {
         studentName: '박민수',
         phone: '010-4567-8901',
         paymentDate: '2021-04-01',
      },
      {
         studentName: '정미경',
         phone: '010-5678-9012',
         paymentDate: '2021-05-01',
      },
   ]

   return (
      <Wrapper id='students-table-wrapper'>
         <TableHeader>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
            <TableHeaderItem>결제일</TableHeaderItem>
         </TableHeader>
         <TableBody>
            {STUDENTS.map((student, index) => (
               <TableRow>
                  <TableItem key={index}>
                     {student.studentName}
                  </TableItem>
                  <TableItem key={index}>
                     {student.phone}
                  </TableItem>
                  <TableItem key={index}>
                     {student.paymentDate}
                  </TableItem>
               </TableRow>
            ))}

         </TableBody>
      </Wrapper>
   )
}

export default StudentsTable

const Wrapper = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid #e0e0e0;
`

const TableHeader = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   background-color: #f0f0f0;
`

const TableHeaderItem = styled.div`
   width: 50%;
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
`

const TableItem = styled.div`
   width: 50%;
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
