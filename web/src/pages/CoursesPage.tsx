import { useEffect, useState } from "react";
import Main from "../components/Main";
import styled from "styled-components";
import Course from "../components/Course";
import { getCourses } from "../apis/courseAPI";
import { courseType } from "../types/types";
import { formatCourseResponse } from "../utils/formatCourseResponse";

// export const courseType = {
//   courseId: 0,
//   courseTitle: "",
//   courseCost: 0,
//   courseStartDate: "",
//   courseEndDate: "",
//   courseImages: [""],
//   courseTags: [""],
//   courseTimetables: [
//      {
//         weekday: "",
//         startTime: "",
//         endTime: ""
//      }
//   ]
// };

const CoursesPage = () => {
  const [courses, setCourses] = useState<courseType[]>([]);

  useEffect(() => {
    // 페이지 로드 시 상단으로 이동
    // window.scrollTo(0, 0); todo

    // 강의 데이터 불러오기
    const fetchData = async () => {
      try {
        const data = await getCourses();
        console.log(data);

        //response 가공
        const formattedData = formatCourseResponse(data);

        setCourses(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(courses);
  }
  , [courses]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const coursesPerPage = 3; // 페이지당 표시할 코스 개수

  // 강의 데이터 샘플
  const courses_example = [
    { Id: 1, ImgUrl: "/images/courseBanner/course-banner-oneshot1.png", Title: "원샷반1", Price: "130,000원", Tags: ["온라인", "녹화본제", "오프라인"] },
    { Id: 2, ImgUrl: "/images/courseBanner/course-banner-oneshot2.png", Title: "원샷반2", Price: "150,000원", Tags: ["온라인", "녹화본제", "오프라인"] },
    { Id: 3, ImgUrl: "/images/courseBanner/course-banner-oneshot3.png", Title: "원샷반3", Price: "170,000원", Tags: ["온라인", "녹화본제", "오프라인"] },
    { Id: 4, ImgUrl: "/images/courseBanner/course-banner-pocket.png", Title: "회화포켓", Price: "200,000원", Tags: ["온라인", "녹화본", "오프라인"] },
    { Id: 5, ImgUrl: "/images/courseBanner/course-banner-reading.png", Title: "원서읽기", Price: "100,000원", Tags: ["온라인가능"] },
    { Id: 6, ImgUrl: "/images/courseBanner/course-banner-refill.png", Title: "회화 무한리필", Price: "180,000원", Tags: ["온라인", "녹화본", "오프라인"] },
    { Id: 7, ImgUrl: "/images/courseBanner/course-banner-secret.png", Title: "회화비밀", Price: "120,000원", Tags: ["온라인", "녹화본", "오프라인"] },
  ];

  // 현재 페이지에 표시할 코스 계산
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses_example.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 최상단으로 스크롤, 부드럽게 이동
    window.scrollTo(0, 0);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(courses_example.length / coursesPerPage);

  return (
    <>
      <Main>
        <Wrapper>
          <Title>예리 센세와 함께 일본어를 배워보세요!</Title>

          <CoursesContainer>
            {currentCourses.map((course) => (
              <Course
                key={course.Id}
                Id={course.Id}
                ImgUrl={course.ImgUrl}
                Title={course.Title}
                Price={course.Price}
                Tags={course.Tags}
              />
            ))}
            {/* {courses.map((course) => (
              <Course
                key={course.courseId}
                Id={course.courseId}
                ImgUrl={course.courseImages[0].imageUrl}
                Title={course.courseTitle}
                Price={course.courseCost.toString()}
                Tags={course.courseTags}
              />
            ))} */}
          </CoursesContainer>

          {/* 페이지네이션 */}
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index + 1}
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        </Wrapper>
      </Main>
    </>
  );
};

export default CoursesPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 40px;
  margin-top: 40px;
  width: 100%;
  color: #402900;
  border-bottom: 1px solid #402900;
  padding-bottom: 20px;
`;

const CoursesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px; // 각 코스 사이의 간격
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px; // 페이지 버튼 간 간격
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 7px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#402900" : "#f0f0f0")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#402900" : "#d3d3d3")};
  }
`;
