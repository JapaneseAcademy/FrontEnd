import { useEffect, useMemo, useState } from "react";
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
  const [courseLevel, setCourseLevel] = useState<string>("ALL");
  const [cachedCourses, setCachedCourses] = useState<Record<string, course[]>>({}); // 코스 캐싱

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseLevel(e.target.value);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      // 이미 캐시된 데이터가 있으면 새로 요청하지 않음
      if (cachedCourses[courseLevel]) {
        setCourses(cachedCourses[courseLevel]);
        return;
      }

      try {
        const data = await getCourseInfos(courseLevel);
        const formattedCourses = data.map((course: any) => ({
          courseInfoId: course.courseInfoId,
          courseImage: course.mainImageUrl,
          tags: convertTags(course.live, course.online, course.recorded),
          courseTitle: course.title,
          courseCost: course.cost,
          level: course.level,
        }));

        // 캐시 업데이트 및 courses 설정
        setCachedCourses((prev) => ({
          ...prev,
          [courseLevel]: formattedCourses,
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchCourses();
  }, [courseLevel, cachedCourses]); // cachedCourses를 의존성에 포함하여 최신 데이터 반영

  useEffect(() => {
    console.log("세팅 후:", courses);
  }, [courses]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  // 현재 페이지에 표시할 코스 계산 (useMemo 적용)
  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return courses.slice(startIndex, startIndex + coursesPerPage);
  }, [courses, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <>
      <Main>
        <Wrapper>
          { isLoading ? (<Loading />)
          : (
          <>
            <Title>예리 센세와 함께 일본어를 배워보세요!</Title>
            <LevelDropdown onChange={handleLevelChange}>
              <option value="ALL">전체</option>
              <option value="기초">기초</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
              <option value="프리">프리</option>
            </LevelDropdown>
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
  margin-bottom: 20px;
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

const LevelDropdown = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #402900;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  color: #402900;
  width: 70px;
  //좌측 정렬
  margin-right: auto;
`;