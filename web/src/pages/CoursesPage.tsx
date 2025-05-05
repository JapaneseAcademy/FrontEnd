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
import { Helmet } from "react-helmet-async";


const CoursesPage = () => {
  const [allCourses, setAllCourses] = useState<course[]>([]); // 원본 데이터 저장
  const [courses, setCourses] = useState<course[]>([]);
  const [isLoading] = useRecoilState<boolean>(loadingAtom);
  const [level, setLevel] = useState<string>("all");

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourseInfos();
        // console.log(data);  
        const formattedCourses = data.map((course: any) => ({
          courseInfoId: course.courseInfoId,
          courseImage: course.mainImageUrl,
          tags: convertTags(course.live, course.online, course.recorded, course.liveOnline),
          courseTitle: course.title,
          baseCost: course.baseCost,
          saleCost: course.saleCost,
          level: course.level,
          date: course.date,
        }));

        setAllCourses(formattedCourses); // ✅ 전체 데이터 저장
        setCourses(formattedCourses); // ✅ 최초에는 전체 데이터 표시
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCourses();
  }, []);

  // 선택한 레벨에 따라 필터링 (allCourses를 유지하면서 courses만 변경)
  useEffect(() => {
    if (level === "all") {
      setCourses(allCourses);
    } else {
      const filteredCourses = allCourses.filter((course) => course.level === level);
      setCourses(filteredCourses);
    }
  }, [level, allCourses]);

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
      <Helmet
        title="강의 목록 - 예리한 일본어"
        meta={[
            {
              name: "description",
              content: "예리한 일본어의 강의 목록을 확인해보세요. 예리 센세와 함께 일본어를 배워보세요!",
            },
        ]}
        link={[{ rel: "canonical", href: "https://www.yeri-jp.com/courses" }]}
      />

      <Main>
        <Wrapper>
          { isLoading ? (<Loading />)
          : (
          <>
            <Title>예리 센세와 함께 일본어를 배워보세요!</Title>
            <LevelDropdown onChange={handleLevelChange}>
              <option value="all">전체</option>
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
                  saleCost={course.saleCost}
                  baseCost={course.baseCost}
                  tags={course.tags}
                  level={course.level}
                  date={course.date}
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
  padding-bottom: 15px;
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
  width: 70px;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #402900;
  border-radius: 5px;
  background-color: #fff;
  color: #402900;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  padding-left: 5px;
  margin-right: auto;
`;