import { useEffect, useState } from "react";
import Main from "../components/Main";
import styled from "styled-components";
import Course from "../components/Course";
import { convertTags } from "../utils/utils";
import { getCourseInfos } from "../apis/courseAPI";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../recoil/loadingAtom";
import Loading from "../components/Loading";
import { course } from "../types/types";


const CoursesPage = () => {
  const [courses, setCourses] = useState<course[]>([]);
  const [isLoading] = useRecoilState<boolean>(loadingAtom);

  useEffect(() => {
    const fetchCourses = async () => {
      // setIsLoading(true); // ✅ 로딩 시작
      try {
        const data = await getCourseInfos();
        const formattedCourses = data.map((course: any) => ({
          courseInfoId: course.courseInfoId,
          courseImage: course.mainImageUrl,
          tags: convertTags(course.live, course.online, course.recorded),
          courseTitle: course.title,
          courseCost: course.cost,
          level: course.level,
        }));

        setCourses(formattedCourses); // ✅ 한 번에 전체 데이터 세팅
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        // setIsLoading(false); // ✅ 로딩 종료
      }
    };

    fetchCourses();
  }, []);
  

  useEffect(() => {
    console.log("세팅 후:", courses);
  }
  , [courses]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const coursesPerPage = 3; // 페이지당 표시할 코스 개수

  // 현재 페이지에 표시할 코스 계산
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 최상단으로 스크롤, 부드럽게 이동
    window.scrollTo(0, 0);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  return (
    <>
      <Main>
        <Wrapper>
          { isLoading ? (<Loading />)
          : (
          <>
            <Title>예리 센세와 함께 일본어를 배워보세요!</Title>

            <CoursesContainer>
              {currentCourses.map((course: course) => (
                <Course
                  key={course.courseInfoId}
                  courseInfoId={course.courseInfoId}
                  courseImage={course.courseImage}
                  courseTitle={course.courseTitle}
                  courseCost={course.courseCost}
                  tags={course.tags}
                  level={course.level}
                />
              ))}
            </CoursesContainer>

            {/* 페이지네이션 */}
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  $isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
            </Pagination>
          </>
          )}
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

const PageButton = styled.button<{ $isActive: boolean }>`
  padding: 7px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? "#402900" : "#f0f0f0")};
  color: ${(props) => (props.$isActive ? "#fff" : "#000")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#402900" : "#d3d3d3")};
  }
`;
