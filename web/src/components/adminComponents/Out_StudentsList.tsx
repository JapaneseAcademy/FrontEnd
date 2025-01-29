import styled from "styled-components"
import { STUDENTS_LIST } from "../../constants/studentsList" //임시로 만든 데이터 사용
import FilterContainer from "./etc/FilterContainer"
import { useState } from "react"

const Out_StudentsList = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

   // 선택한 학생의 데이터 가져오기
  const selectedStudent = STUDENTS_LIST.find(student => student.id === selectedStudentId);



  return (
    <Wrapper>
      <StudentListContainer>
        <Title>학생 목록</Title>
        <FilterContainer />
        {/* 학생 목록 표 */}
        <StudentsTable>
          <TableHeader>
            <TableHeaderItem id='name'>이름</TableHeaderItem>
            <TableHeaderItem id='birth'>생년월일</TableHeaderItem>
            <TableHeaderItem id='class'>수강현황</TableHeaderItem>

          </TableHeader>
          <TableBody>
            {STUDENTS_LIST.map((student) => (
              <TableRow 
                key={student.id} 
                onClick={() => setSelectedStudentId(student.id)}
                isSelected={selectedStudentId === student.id} 
              >
                <TableItem>{student.name}</TableItem>
                <TableItem>{student.birth}</TableItem>
                <TableItem>{student.class}</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </StudentsTable>
      </StudentListContainer>

      <StudentDetailContainer>
        <DetailRow>
          <DetailTitle>이름</DetailTitle>
          <DetailContent>{selectedStudent?.name}</DetailContent>
        </DetailRow>
        <DetailRow>
        <DetailTitle>생년월일</DetailTitle>
          <DetailContent>{selectedStudent?.birth}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>전화번호</DetailTitle>
          <DetailContent>{selectedStudent?.phone}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>수강현황</DetailTitle>
          <DetailContent>{selectedStudent?.class}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>주소</DetailTitle>
          <DetailContent></DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>특이사항</DetailTitle>
          <DetailInput></DetailInput>
        </DetailRow>

        <ButtonsContainer>
          <Button>수정</Button>
          <Button>삭제</Button>
        </ButtonsContainer>
      </StudentDetailContainer>
    </Wrapper>
  )
}

export default Out_StudentsList

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const StudentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 60%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
`

const Title = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e1e1;
  font-weight: bold;
  font-size: 1.5rem;
`

const StudentsTable = styled.div`
  width: 90%;
  display: flex;
  height: 50%;
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
const TableRow = styled.div<{ isSelected: boolean }>`
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
  background-color: ${({ isSelected }) => (isSelected ? "#e6f7ff" : "transparent")}; 
  
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#cceeff" : "#f1f1f1")}; 
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



const StudentDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 40%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
  padding-top: 10px;
  padding-bottom: 10px;
`

const DetailRow = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`

const DetailTitle = styled.div`
  width: 20%;
  font-weight: bold;
  font-size: 1rem;
`

const DetailContent = styled.div`
  font-size: 0.9rem;
  border: 1px solid #e1e1e1;
  padding: 10px;
  width: 80%;
  border-radius: 5px;
`

const DetailInput = styled.input`
  width: 80%;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
  border: 1px solid #e1e1e1;
`

const ButtonsContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`

const Button = styled.button`
  width: 80px;
  height: 30px;
  background-color: #d7d7d7;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #636363;
    color: #ffffff;
  }
`