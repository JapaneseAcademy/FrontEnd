import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAdminStudents } from "../../apis/adminAPI/adminStudentsAPI.ts";
import { useNavigate } from "react-router-dom";
import MessageFilter from "./filters/MessageFilter.tsx";
import SendMessageContainer from "./etc/SendMessageContainer.tsx";

type Student = {
  id: number;
  name: string;
  birth: string;
  phone: string;
  note: string;
}

const Out_SendMessages = () => {
  // const [selectedStudentId, setSelectedStudentId] = useState<number | null>(1);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]); // ✅ 여러 학생 선택 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAdminStudents(navigate).then((data) => {
      setStudents(data);
      // setSelectedStudentId(data[0]?.id || null);
    });
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchTerm)
  );

  // ✅ 학생 선택/해제 함수
  const handleStudentSelect = (id: number) => {
    setSelectedStudents((prevSelected) => 
      prevSelected.includes(id) 
        ? prevSelected.filter((studentId) => studentId !== id) // 이미 선택된 경우 해제
        : [...prevSelected, id] // 선택되지 않은 경우 추가
    );
  };

  useEffect(() => {
    console.log("선택된 학생 ID 목록: ", selectedStudents);
  }
  , [selectedStudents]);

  return (
    <Wrapper id="admin-students-list-wrapper">
      <StudentListContainer id="student-list-container">
        <Title>문자 발송</Title>
        <MessageFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <StudentsTable>
          <TableHeader>
            <TableHeaderItem>선택</TableHeaderItem>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>생년월일</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                $isselected={selectedStudents.includes(student.id)}
                onClick={() => handleStudentSelect(student.id)}
              >
                <TableItem>
                  <Checkbox
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                    onClick={(e) => e.stopPropagation()} // ✅ 부모 클릭 이벤트 방지
                  />
                </TableItem>
                <TableItem>{student.name}</TableItem>
                <TableItem>{student.birth}</TableItem>
                <TableItem>{student.phone}</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </StudentsTable>
      </StudentListContainer>

      <SendMessageContainer />
    </Wrapper>
  );
};

export default Out_SendMessages;


const Checkbox = styled.input`
  width: 20px;
  height: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
`


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
  padding: 10px 0;
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
  width: 10%;
  border-right: 1px solid #e1e1e1;
  }
  &:nth-child(2) {
    width: 20%;

    border-right: 1px solid #e1e1e1;
  }
  &:nth-child(3) {
    width: 30%;
        border-right: 1px solid #e1e1e1;

  }
  &:nth-child(4) {
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
  width: 10%;
  border-right: 1px solid #e1e1e1;
  }
  &:nth-child(2) {
    width: 20%;
    border-right: 1px solid #e1e1e1;
  }
  &:nth-child(3) {
    width: 30%;
    border-right: 1px solid #e1e1e1;

  }
  &:nth-child(4) {
    width: 50%;
  }
`