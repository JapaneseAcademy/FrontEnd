import styled from "styled-components"
import FilterContainer from "./etc/FilterContainer"
import { useEffect, useState } from "react"
import { getCourses } from "../../apis/courseAPI"

// type courseBlock = {
//   day: string;
//   time: string;
// }

type Course = {
  courseId: string;
  courseTitle: string;
  courseMainImage: string;
  courseImages: string[];
  // courseBlocks: courseBlock[]; {todo: api 수정되면 추가}
  coursePrice: number;
  studentsNum: number;
  
  isOnline: boolean;
  isLive: boolean;
  isRecorded: boolean;
}

const Out_CoursesList = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("1");
  const [courses, setCourses] = useState<Course[]>([])

  // 선택한 수업의 데이터 가져오기(임시)
  const selectedCourse = courses.find(course => course.courseId == selectedCourseId);

  useEffect(() => {
    //강의 목록 전체 조회 api
    getCourses().then((data) => {
      const formattedCourses = data.map((course: any) => ({
        courseId: course.id,
        courseTitle: course.title,
        courseMainImage: course.descriptions[0],
        courseImages: course.descriptions,
        // courseBlocks: course.blocks,
        coursePrice: course.cost,
        studentsNum: 11, //{todo: 임시}

        isOnline: course.isOnline,
        isLive: course.isLive,
        isRecorded: course.isRecorded
      }));
      setCourses(formattedCourses);
    });
  }, []);

  useEffect(() => {
    console.log("세팅 후:", courses);
  }, [courses]);

  return (
    <Wrapper>
      <CourseListContainer id-="course-list-container"> 
        <Title>수업 목록</Title>
        <FilterContainer/>
        {/* 학생 목록 표 */}
        <CoursesTable id='courses-table'>
          <TableHeader>
            <TableHeaderItem id='courseName'>수업 이름</TableHeaderItem>
            <TableHeaderItem id='day'>요일</TableHeaderItem>
            <TableHeaderItem id='time'>시간</TableHeaderItem>
            <TableHeaderItem id='numOfStudents'>학생 수</TableHeaderItem>

          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow 
                key={course.courseId} 
                onClick={() => setSelectedCourseId(course.courseId)}
                isSelected={selectedCourseId == course.courseId} 
              >
                <TableItem>{course.courseTitle}</TableItem>
                <TableItem>화, 수</TableItem> 
                <TableItem>13:00 - 15:00</TableItem>
                <TableItem>11</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </CoursesTable>
      </CourseListContainer>

      <CourseDetailContainer>
        <DetailRow>
          <DetailTitle>수업이름</DetailTitle>
          <DetailContent>{selectedCourse?.courseTitle}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>썸네일 이미지</DetailTitle>
          <DetailContent><CourseImage src={selectedCourse?.courseMainImage}/></DetailContent>
        </DetailRow>
        <DetailRow>
        <DetailTitle>상세 이미지</DetailTitle>
          <DetailContent>
            {selectedCourse?.courseImages.map((image, index) => (
              <CourseImage key={index} src={image}/>
            ))}
          </DetailContent>
        </DetailRow>
        <DetailRow>
        <DetailTitle>요일</DetailTitle>
          <DetailContent>화요일, 수요일</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>시간</DetailTitle>
          <DetailContent>13:00 - 15:00</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>학생 수</DetailTitle>
          <DetailContent>11</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>수강료</DetailTitle>
          <DetailContent>{selectedCourse?.coursePrice}</DetailContent>
        </DetailRow>

        <ButtonsContainer>
          <Button>수정</Button>
          <Button>삭제</Button>
        </ButtonsContainer>
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
`

const CourseListContainer = styled.div`
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
  padding: 10px;
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
  flex: 1; // ✅ Header와 동일하게 설정
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid #e1e1e1; // ✅ 마지막 항목 제외
  }
`;




const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 40%;
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

const CourseImage = styled.img`
  width: 200px; 
  height: 200px;
  object-fit: cover;
`