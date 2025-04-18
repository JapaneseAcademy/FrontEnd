import styled from "styled-components";
import { useEffect, useState } from "react";
import StudentFilter from "./filters/StudentFilter.tsx";
import { getAdminStudents, updateStudentNote } from "../../apis/adminAPI/adminStudentsAPI.ts";

type Student = {
  id: number;
  name: string;
  birth: string;
  phone: string;
  note: string;
}

const Out_StudentsList = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<number>(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 검색어 상태 추가
  //학생 리스트
  const [students, setStudents] = useState<Student[]>([]);

    // 🔹 검색어 변경 함수 (StudentFilter에서 입력한 값을 업데이트)
    const handleSearchChange = (term: string) => {
      setSearchTerm(term);
    };
  
    // 🔹 검색어를 포함하는 학생들만 필터링
    const filteredStudents = students.filter((student) =>
      student.name.includes(searchTerm)
    );

  // 선택한 학생의 데이터 가져오기 (필터링된 목록에서 찾음)
  const selectedStudent = students.find(
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
      selectedStudent.note = editedStudent.note;
    }

    if (confirm("저장하시겠습니까?")) {
      // 특이사항 수정 api 호출
      console.log(selectedStudentId, editedStudent.note);
      updateStudentNote(selectedStudentId, editedStudent.note);
      setIsEditing(false);
    }
  };


  // 학생들 정보 불러오는 api 호출
  useEffect(() => {
    getAdminStudents().then((data) => {
      console.log(data);
      setStudents(data);
      //가장 첫번째 학생의 id로 초기화
      setSelectedStudentId(data[0].id);
    }
    );
  }
  , []);

  return (
    <Wrapper id='admin-students-list-wrapper'>

      <StudentListContainer id="student-list-container">
        <Title>
          학생 목록
        </Title>

         {/* 🔹 검색 기능을 위한 검색어 변경 함수 전달 */}
        <StudentFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        <StudentsTable>
          <TableHeader>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>생년월일</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
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
      </StudentListContainer>

      <StudentDetailContainer id="student-detail-container">
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
          <DetailTitle>특이사항</DetailTitle>
          {isEditing ? (
            <DetailInput style={{minHeight:'150px'}} value={editedStudent.note || ''} onChange={(e) => handleInputChange(e, "note")} />
          ) : (
            <DetailContent style={{minHeight:'150px'}}>{selectedStudent?.note}</DetailContent>
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
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 40px;
`

const DetailRow = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`

const DetailTitle = styled.div`
  width: 20%;
  font-weight: 500;
  font-size: 1rem;
`

const DetailContent = styled.div`
  font-size: 0.9rem;
  border: 1px solid #e1e1e1;
  background-color: #f7f7f7;
  padding: 10px;
  width: 80%;
  border-radius: 5px;
`

const DetailInput = styled.input`
  font-size: 0.9rem;
  border: 1px solid #e1e1e1;
  padding: 10px;
  width: 80%;
  font-family: 'Pretendard';
  border-radius: 5px;
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
