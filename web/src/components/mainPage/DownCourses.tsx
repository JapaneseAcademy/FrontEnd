import styled from "styled-components"
import MainCourse from "./MainCourse"
import { course } from "../../types/types";
import { useEffect, useState } from "react";
import { getCourseInfos } from "../../apis/courseAPI";
import { convertTags } from "../../utils/utils";

const DownCourses = () => {
   const [courses, setCourses] = useState<course[]>([]);
   
   useEffect(() => {
      getCourseInfos().then((data) => {
         const formattedCourses = data.map((course: any) => ({
            courseInfoId: course.courseInfoId,
            courseImage: course.mainImageUrl,
            tags: convertTags(course.live, course.online, course.recorded),
            courseTitle: course.title,
            baseCost: course.baseCost,
            saleCost: course.saleCost,
            level: course.level,
         }));
         setCourses(formattedCourses);
      });
   }, []);

   return (
      <Wrapper id='down-courses-wrapper'>
         {/* 4개만 보여주기 */}
         {courses.slice(0, 4).map((course) => (
            <MainCourse
               key={course.courseInfoId}
               courseInfoId={course.courseInfoId}
               courseImage={course.courseImage}
               courseTitle={course.courseTitle}
               saleCost={course.saleCost}
               baseCost={course.baseCost}
               tags={course.tags}
               level={course.level}
            />
         ))}
      </Wrapper>
   )
}

export default DownCourses

const Wrapper = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap; /* 줄바꿈 방지 */
   overflow-x: auto; /* 가로 스크롤 활성화 */
   gap: 20px; /* 카드 간 간격 */
   padding-bottom: 10px;

   /* 스크롤바 스타일 (선택 사항) */
   &::-webkit-scrollbar {
      height: 8px; /* 스크롤바 높이 */
   }

   &::-webkit-scrollbar-thumb {
      background-color: #c6c6c6; /* 스크롤바 색상 */
      border-radius: 4px; /* 둥근 모서리 */
   }

   &::-webkit-scrollbar-track {
      background-color: #f1f1f1; /* 스크롤바 배경 */
   }
`