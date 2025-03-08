import { useEffect, useState } from "react";
import styled from "styled-components"
import { getAdminCourseInfoTitles } from "../../../apis/adminAPI/adminReviewAPI";

type courseTitle = {
   courseInfoId: number;
   title: string;
};

interface ReviewFilterProps {
   setSelectCourseInfoId: (courseInfoId: number) => void;
}

const ReviewFilter = ({setSelectCourseInfoId}: ReviewFilterProps) => {
   const [courseTitles, setCourseTitles] = useState<courseTitle[]>([]);

   useEffect(() => {
      //코스 타이틀 불러오기
      getAdminCourseInfoTitles().then((data) => {
         setCourseTitles(data);
      });
   }, []);
   
   return (
   <Wrapper id="filter-container-wrapper">
      <CourseDropdown id="course-dropdown" onChange={(e) => setSelectCourseInfoId(Number(e.target.value))}>
         <option value={0}>전체</option>
         {courseTitles.map((courseTitle) => (
            <option key={courseTitle.courseInfoId} value={courseTitle.courseInfoId}>{courseTitle.title}</option>
         ))}
      </CourseDropdown>
   </Wrapper>
   )
}

export default ReviewFilter

const Wrapper = styled.div`
   width: 95%;  
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 10px;
`

const CourseDropdown = styled.select`
   width: 30%;
   height: 30px;
   padding: 5px;
   border-radius: 5px;
   //글씨 크기
   font-size: 0.8rem;

   //hover
   &:hover {
      background-color: #f1f1f1;
   }
`

