import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import styled from "styled-components";
import Course from "../components/Course";

const CoursesPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const coursesPerPage = 5; // 페이지당 표시할 코스 개수

  // 모든 코스 데이터
  const courses = [
    { Id: 1, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "원샷반", Price: "130,000원" },
    { Id: 2, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "초급반", Price: "150,000원" },
    { Id: 3, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "중급반", Price: "170,000원" },
    { Id: 4, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "고급반", Price: "200,000원" },
    { Id: 5, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "입문반", Price: "100,000원" },
    { Id: 6, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "회화반", Price: "180,000원" },
    { Id: 7, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "문법반", Price: "120,000원" },
    { Id: 8, ImgUrl: "/images/courseBanner/courseBanner1.png", Title: "JLPT반", Price: "140,000원" },
  ];

  // 현재 페이지에 표시할 코스 계산
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 최상단으로 스크롤, 부드럽게 이동
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(courses.length / coursesPerPage);

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
              />
            ))}
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
`;

const CoursesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 70px; // 각 코스 사이의 간격
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px; // 페이지 버튼 간 간격
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 10px 15px;
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
