import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAdminStudents } from "../../apis/adminAPI/adminStudentsAPI.ts";
import { useNavigate } from "react-router-dom";
import MessageFilter from "./filters/MessageFilter.tsx";
import SendMessageContainer from "./etc/SendMessageContainer.tsx";
import CourseFilter from "./filters/CourseFilter.tsx";
import { getTimeTableandStudentsForMessage } from "../../apis/adminAPI/adminMessageAPI.ts";

type Student = {
  id: number;
  name: string;
  birth: string;
  phone: string;
  note: string;
}

type TimeTable = {
  timeTableId: number;
  courseTitle: string;
  timeBlocks: TimeBlock[];

  students: number[];
}

type TimeBlock = {
  endTime: string;
  startTime: string;
  weekday: string;
}

const Out_SendMessages = () => {
  // ✅ 선택된 TimeTable ID 상태 추가
  const [selectedTimeTableId, setSelectedTimeTableId] = useState<number | null>(null);
  
  // 현재 년도와 월을 기본값으로 설정
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줌
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [timeTables, setTimeTables] = useState<TimeTable[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]); // ✅ 학생 선택 상태 유지
  const navigate = useNavigate();

  // 전체선택하는 함수, 선택된 학생들을 모두 선택해제하거나 선택하는 함수
  const handleSelectAll = () => {
    const allSelected = filteredStudents.every(student =>
      selectedStudents.some(selected => selected.id === student.id)
    );
  
    if (allSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents);
    }
  };
  

  useEffect(() => {
    getAdminStudents().then((data) => {
      setStudents(data);
    });
  }, [navigate]);

  useEffect(() => {
    getTimeTableandStudentsForMessage(selectedYear, selectedMonth).then((data) => {
      setTimeTables(data);
      if (data.length > 0) {
        setSelectedTimeTableId(0); // 기본으로 전체 선택
      }
    });
  }, [selectedYear, selectedMonth]);


  
  // 🔹 검색어 적용 + 선택된 TimeTable에 속한 학생만 필터링
  const filteredStudents = students.filter((student) =>
    student.name.includes(searchTerm) &&
    (selectedTimeTableId
      ? timeTables
          .find((t) => t.timeTableId === selectedTimeTableId)
          ?.students.includes(student.id)
      : true) // ✅ 선택된 TimeTable에 포함된 학생만 표시
  );


  // ✅ 학생 선택/해제 함수 (기존 기능 유지)
  const handleStudentSelect = (student: Student) => {
    setSelectedStudents((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.id === student.id);
      const newSelection = isSelected
        ? prevSelected.filter((s) => s.id !== student.id) // 선택 해제
        : [...prevSelected, student]; // 선택 추가

      // console.log("선택된 학생 ID:", newSelection.map((s) => s.id)); // ✅ ID 출력 유지
      return newSelection;
    });
  };

  return (
    <Wrapper>
      <StudentListContainer>
        <Title>문자 발송</Title>
        <CourseFilter handleYearChange={setSelectedYear} handleMonthChange={setSelectedMonth} selectedYear={selectedYear} selectedMonth={selectedMonth} />
        
        {/* ✅ 선택된 TimeTable ID 변경 함수 추가 */}
        <MessageFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} timeTables={timeTables} onTimeTableChange={setSelectedTimeTableId} />

        <StudentsTable>
          <TableHeader>
            <TableHeaderItem>
            <Checkbox
              type="checkbox"
              onClick={handleSelectAll}
              checked={filteredStudents.length > 0 && filteredStudents.every(student =>
                selectedStudents.some(selected => selected.id === student.id)
              )}
              readOnly
            />
            </TableHeaderItem>
            <TableHeaderItem>이름</TableHeaderItem>
            <TableHeaderItem>생년월일</TableHeaderItem>
            <TableHeaderItem>전화번호</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                $isselected={selectedStudents.some((s) => s.id === student.id)}
                onClick={() => handleStudentSelect(student)}
              >
                <TableItem>
                  <Checkbox
                    type="checkbox"
                    checked={selectedStudents.some((s) => s.id === student.id)}
                    onChange={() => handleStudentSelect(student)}
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

      <SendMessageContainer students={selectedStudents}/>
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