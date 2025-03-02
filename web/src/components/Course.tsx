import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface CourseProps {
   courseId: string;
   courseImage: string;
   courseTitle: string;
   courseCost: number;
   Tags: string[];
   level: string;
}

const Course = ({ courseId, courseImage, courseTitle, courseCost, Tags, level }: CourseProps) => {
   const navigate = useNavigate();

   const handleCourseClick = () => {
      navigate(`/courses/${courseId}`); // 해당 Course의 ID로 이동
   };

   //가격에 1000원 단위로 콤마 추가
   const stringCost = courseCost.toString();
   const formattedCost = stringCost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

   return (
      <Wrapper onClick={handleCourseClick}>
         <CourseImage src={courseImage} alt={courseTitle} />
         <CourseTagContainer>
            {Tags.map((tag) => (
               <CourseTag key={tag}>{tag}</CourseTag>
            ))}
            <CourseTag style={{backgroundColor:'#61b58d'}}>{level}</CourseTag>
         </CourseTagContainer>
         <CourseTitle>{courseTitle}</CourseTitle>
         <CoursePrice>{formattedCost}원</CoursePrice>
      </Wrapper>
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