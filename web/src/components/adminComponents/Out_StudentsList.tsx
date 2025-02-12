import styled from "styled-components";
import { STUDENTS_LIST } from "../../constants/studentsList";
import FilterContainer from "./etc/FilterContainer";
import { useState } from "react";

const Out_StudentsList = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<any>({});

  // 선택한 학생의 데이터 가져오기
  const selectedStudent = STUDENTS_LIST.find(
    (student) => student.id === selectedStudentId
  );

  // 편집 모드로 전환
  const handleEdit = () => {
    setIsEditing(true);
    setEditedStudent({ ...selectedStudent });
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEditedStudent({ ...editedStudent, [field]: e.target.value });
  };

  // 저장 버튼 클릭 시 적용
  const handleSave = () => {
    if (selectedStudent) {
      selectedStudent.name = editedStudent.name;
      selectedStudent.birth = editedStudent.birth;
      selectedStudent.phone = editedStudent.phone;
      selectedStudent.class = editedStudent.class;
    }
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <StudentListContainer>
        <Title>
          학생 목록
          <PlusButton>+</PlusButton>
        </Title>
        <FilterContainer />
        <StudentsTable>
          <TableHeader>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>생년월일</TableHeaderItem>
            <TableHeaderItem>수강현황</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {STUDENTS_LIST.map((student) => (
              <TableRow
                key={student.id}
                onClick={() => {
                  setSelectedStudentId(student.id);
                  setIsEditing(false);
                }}
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
          {isEditing ? (
            <DetailInput value={editedStudent.name || ''} onChange={(e) => handleInputChange(e, "name")} />
          ) : (
            <DetailContent>{selectedStudent?.name}</DetailContent>
          )}
        </DetailRow>
        <DetailRow>
          <DetailTitle>생년월일</DetailTitle>
          {isEditing ? (
            <DetailInput value={editedStudent.birth || ''} onChange={(e) => handleInputChange(e, "birth")} />
          ) : (
            <DetailContent>{selectedStudent?.birth}</DetailContent>
          )}
        </DetailRow>
        <DetailRow>
          <DetailTitle>전화번호</DetailTitle>
          {isEditing ? (
            <DetailInput value={editedStudent.phone || ''} onChange={(e) => handleInputChange(e, "phone")} />
          ) : (
            <DetailContent>{selectedStudent?.phone}</DetailContent>
          )}
        </DetailRow>
        <DetailRow>
          <DetailTitle>수강현황</DetailTitle>
          {isEditing ? (
            <DetailInput value={editedStudent.class || ''} onChange={(e) => handleInputChange(e, "class")} />
          ) : (
            <DetailContent>{selectedStudent?.class}</DetailContent>
          )}
        </DetailRow>

        <ButtonsContainer>
          {isEditing ? (
            <Button onClick={handleSave}>저장</Button>
          ) : (
            <Button onClick={handleEdit}>수정</Button>
          )}
        </ButtonsContainer>
      </StudentDetailContainer>
    </Wrapper>
  );
};

export default Out_StudentsList;

// 스타일링 코드 (생략 가능)


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
  justify-content: space-between;
  padding-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e1e1;
  font-weight: bold;
  font-size: 1.5rem;
`

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #d7d7d7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;

  &:hover {
    background-color: #636363;
    color: #ffffff;
  }
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
