import styled from "styled-components"
import { useEffect, useState } from "react"
// import { FiPlus } from "react-icons/fi"
import CourseFilter from "./filters/CourseFilter.tsx"
import CourseMembers from "./etc/CourseMembers.tsx"
import { getAdminCoursesByMonth } from "../../apis/adminAPI/adminCoursesAPI.ts"
import { convertTime, convertWeekday } from "../../utils/utils.ts"

//한 분반
// type timeTable = {
//   timeTableId: number; //분반 아이디
//   timeBlocks: timeBlock[];
// }
//한 타임블럭(분반 내)
type timeBlock = {
  weekday: string;
  startTime: string;
  endTime: string;
}

type timeTable = { //한 
  courseId: number;
  timeTableId: number;
  timeBlocks: timeBlock[];
  
  endDate: string;
  startDate: string;
  title: string;
  studentCount: number;
}

const Out_CoursesList = () => {
  const [selectedTimeTableId, setSelectedTimeTableId] = useState<number>(1);
  const [timeTables, setTimeTables] = useState<timeTable[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedMonth, setSelectedMonth] = useState<string>("03");

  const converTimeTable = (timeTable: timeTable) => {
    let timeTableString = "";
    timeTable.timeBlocks.forEach((timeBlock) => {
      timeTableString += `${convertWeekday(timeBlock.weekday)} ${convertTime(timeBlock.startTime)} - ${convertTime(timeBlock.endTime)} \n `;
    });
    // /을 기준으로 줄바꿈, 마지막 / 제거
    timeTableString = timeTableString.slice(0, -2);
    return timeTableString;
  };


  //년/월 선택 관련
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const selectedTimeTable = timeTables.find((table) => table.timeTableId === selectedTimeTableId);

  useEffect(() => {
    //관리자-월별 강의 조회 api
    getAdminCoursesByMonth(`${selectedYear}-${selectedMonth}`).then((data) => {
      const formattedTimeTables = data.map((timeTable: any) => ({
        courseId: timeTable.courseId,
        timeTableId: timeTable.timeTable.timeTableId,
        timeBlocks: timeTable.timeTable.timeBlocks,
        endDate: timeTable.endDate,
        startDate: timeTable.startDate,
        title: timeTable.title,
        studentCount: timeTable.studentCount,
      }));
      setTimeTables(formattedTimeTables);
    }
    );

  }, [selectedYear, selectedMonth]);

  //년/월 확인
  useEffect(() => {
    console.log("년:", selectedYear, "월:", selectedMonth);
  }, [selectedYear, selectedMonth]);

  //timeTableId 확인
  useEffect(() => {
    console.log("선택된 timeTableId:", selectedTimeTableId);
  }, [selectedTimeTableId]);

  return (
    <Wrapper>
      <CourseListContainer id="course-list-container"> 
        <Title>수업 목록</Title>
        <CourseFilter 
          handleYearChange={handleYearChange} 
          handleMonthChange={handleMonthChange} 
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        {/* 학생 목록 표 */}
        <CoursesTable id='courses-table'>
          <TableHeader>
            <TableHeaderItem id='courseName'>수업 이름</TableHeaderItem>
            <TableHeaderItem id='class'>분반</TableHeaderItem>
            <TableHeaderItem id='numOfStudents'>학생 수</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {timeTables.map((timeTable) => (
              <TableRow 
                key={timeTable.timeTableId} 
                isSelected={selectedTimeTableId === timeTable.timeTableId} 
                onClick={() => setSelectedTimeTableId(timeTable.timeTableId)}
              >
                <TableItem>{timeTable.title}</TableItem>
                <TableItem>{converTimeTable(timeTable)}</TableItem>
                <TableItem>{timeTable.studentCount}</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </CoursesTable>
      </CourseListContainer>

      <CourseDetailContainer id="course-detail-container">
        <DetailRow className='course-title'>
          <DetailTitle>강의명</DetailTitle>
          <DetailContent>{selectedTimeTable?.title || "강의 없음"}</DetailContent>
        </DetailRow>
        {/* <DetailRow className='course-main-image'>
          <DetailTitle>썸네일</DetailTitle>
          <DetailContent>
            <CourseImage src="/images/courseBanner/course-banner-oneshot1.png" alt="대표 이미지" />
          </DetailContent>
        </DetailRow>
        <DetailRow className="course-detail-images">
          <DetailTitle>상세 이미지</DetailTitle>
          <DetailContent>
                <CourseImage src="/images/courseBanner/course-banner-oneshot1.png" alt="상세 이미지" />
                <CourseImage src="/images/courseBanner/course-banner-oneshot1.png" alt="상세 이미지" />
                <CourseImage src="/images/courseBanner/course-banner-oneshot1.png" alt="상세 이미지" />
          </DetailContent>
        </DetailRow> */}
        <DetailRow className='course-timetables'>
          <DetailTitle>분반</DetailTitle>
          <DetailContent>{selectedTimeTable ? converTimeTable(selectedTimeTable) : "분반 정보 없음"}</DetailContent>
        </DetailRow>
        <DetailRow className="course-students">
          <DetailTitle>학생 수</DetailTitle>
          <DetailContent>{selectedTimeTable?.studentCount || 0}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle className="course-period">강의 기간</DetailTitle>
          <DetailContent>{selectedTimeTable ? `${selectedTimeTable.startDate} ~ ${selectedTimeTable.endDate}` : "기간 정보 없음"}</DetailContent>
        </DetailRow>
        <CourseMembers />
      </CourseDetailContainer>

    </Wrapper>
  )
}

export default Out_CoursesList

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  //기본적으로 단어 단위 줄바꿈
  word-break: keep-all;
`

const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 50%;
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

const CoursesTable = styled.div`
  width: 90%;
  display: flex;
  height: 78%;
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
  flex: 1; // ✅ 균등 분배
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid #e1e1e1; // ✅ 마지막 항목 제외
  }

  //세번째 항목
  &:nth-child(3) {
    flex: 0.4;
  }
`;

const TableItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid #e1e1e1; // ✅ 마지막 항목 제외
  }

  //세번째 항목
  &:nth-child(3) {
    flex: 0.4;
  }

  //개행문자 처리
  white-space: pre-line;
  text-align: center;
`;

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
  //스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }

` 
const TableRow = styled.div<{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 9px;
  padding-bottom: 9px;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#e6f7ff" : "transparent")}; 
  
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#cceeff" : "#f1f1f1")}; 
  }
`;


////////////////

const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 50%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
  padding-top: 20px;
  padding-bottom: 10px;

  //넘어가면 스크롤 가능하도록
  overflow-y: scroll;
  height: 100%;
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
  font-weight: 500;
  font-size: 1rem;
  align-self: flex-start;
`

const DetailContent = styled.div`
  font-size: 0.9rem;
  border: 1px solid #e1e1e1;
  padding: 10px;
  width: 80%;
  border-radius: 5px;

  display: flex;
  //넘어가면 다음 줄로
  flex-wrap: wrap;
  gap: 5px;

  //텍스트 줄바꿈 처리
  white-space: pre-line;
`

// const CourseImage = styled.img`
//   width: 120px;
//   height: 120px;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 5px;
// `;

// const ButtonsContainer = styled.div`
//   width: 85%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-bottom: 20px;
// `

// const Button = styled.button`
//   width: 80px;
//   height: 35px;
//   background-color: #d7d7d7;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #636363;
//     color: #ffffff;
//   }
// `

// ////////Editmode 일 때////////
// const Input = styled.input`
//   width: 100%;
//   height: 30px;
//   border: 1px solid #e1e1e1;
//   border-radius: 5px;
//   padding: 5px;
//   font-size: 0.9rem;
//   outline: none;
//   box-sizing: border-box;
// `

// const PlusButton = styled.button`
//   justify-self: flex-end    ;
//   width: 30px;
//   height: 30px;
//   background-color: #d7d7d7;
//   margin-top: 10px;
//   border: none; 
//   border-radius: 5px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 0.6rem;

//   &:hover {
//     background-color: #636363;
//     color: #ffffff;
//   }
// `


// ////
// const Images = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 10px;
//   flex-wrap: wrap;
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #e1e1e1;
//   border-radius: 5px;
//   box-sizing: border-box;
// `;

// const ImageWrapper = styled.div`
//   position: relative;  /* ✅ 개별 이미지의 부모 요소를 기준으로 absolute 배치 */
//   display: inline-block;
// `;


// const DeleteImageButton = styled.button`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   width: 24px;
//   height: 24px;
//   background-color: rgba(230, 73, 73, 0.7);
//   border: none;
//   border-radius: 50%;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
//   color: white;
//   font-weight: bold;

//   &:hover 
//   {
//     background-color: rgba(230, 73, 73, 1);
//   }
// `;
