import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { extractMonthOnly, numberWithCommas } from "../utils/utils";

interface CourseProps {
   courseInfoId: number;
   courseImage: string;
   courseTitle: string;
   baseCost: number;
   saleCost: number;
   tags: string[];
   level: string;
   date: string;
}

const Course = ({ courseInfoId, courseImage, courseTitle, baseCost, saleCost, tags, level, date }: CourseProps) => {
   const navigate = useNavigate();

   const handleCourseClick = () => {
      navigate(`/courses/${courseInfoId}`); // 해당 Course의 ID로 이동
   };

   //가격에 1000원 단위로 콤마 추가
   console.log(date);

   return (
      <Wrapper onClick={handleCourseClick}>
         <CourseImage src={courseImage} alt={courseTitle} loading="lazy"/>
         <CourseTagContainer>
            {tags.map((tag) => (
               <CourseTag key={tag}>{tag}</CourseTag>
            ))}
            <CourseTag style={{backgroundColor:'#61b58d'}}>{level}</CourseTag>
         </CourseTagContainer>
         <CourseTitle>[ {courseTitle} ] - 4월반</CourseTitle>
         {/* saleCost와 baseCost가 다를 때 */}
         { saleCost !== baseCost 
         ? <CoursePrice><span>{numberWithCommas(baseCost)}</span>{numberWithCommas(saleCost)}원</CoursePrice>
         :
         <CoursePrice>{numberWithCommas(baseCost)}원</CoursePrice> }      </Wrapper>
   );
};

export default Course;

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   cursor: pointer; /* 클릭 가능하게 표시 */
`;

const CourseImage = styled.img`
   width: 100%;
   aspect-ratio: 1/1;
`;

const CourseTitle = styled.div`
   font-size: 19px;
   font-weight: 500;
   margin-top: 10px;
`;

const CoursePrice = styled.div`
   font-size: 16px;
   margin-top: 5px;

   span {
      color: #6d6d6d;
      text-decoration: line-through;
      margin-right: 5px;
   }
`;

const CourseTagContainer = styled.div`
   display: flex;
   gap: 5px;
   margin-top: 10px;
`;

const CourseTag = styled.div`
   padding: 5px;
   font-size: 11px;
   font-weight: 600;
   color: white;
   background-color: #ff8255;
   border-radius: 5px;
`;