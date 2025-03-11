import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface CourseProps {
   courseInfoId: number;
   courseImage: string;
   courseTitle: string;
   baseCost: number;
   saleCost: number;
   tags: string[];
   level: string;
}

const MainCourse = ({ courseInfoId, courseImage, courseTitle, baseCost, saleCost, tags, level }: CourseProps) => {
   const navigate = useNavigate();

   const handleCourseClick = () => {
      navigate(`/courses/${courseInfoId}`); // 해당 Course의 ID로 이동
   };

   //가격에 1000원 단위로 콤마 추가
   const stringBaseCost = baseCost.toString();
   const formattedBaseCost = stringBaseCost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   const stringSaleCost = saleCost.toString();
   const formattedSaleCost = stringSaleCost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

   return (
      <Wrapper onClick={handleCourseClick}>
         <CourseImage src={courseImage} alt={courseTitle} />
         <CourseTagContainer>
            {tags.map((tag) => (
               <CourseTag key={tag}>{tag}</CourseTag>
            ))}
            <CourseTag style={{backgroundColor:'#61b58d'}}>{level}</CourseTag>
         </CourseTagContainer>
         <CourseTitle>{courseTitle}</CourseTitle>
         {/* saleCost와 baseCost가 다를 때 */}
         { saleCost !== baseCost 
         ? <CoursePrice><span>{formattedBaseCost}</span>{formattedSaleCost}원</CoursePrice>
         :
         <CoursePrice>{formattedBaseCost}원</CoursePrice> }
      </Wrapper>
   );
};

export default MainCourse;

const Wrapper = styled.div`
   cursor: pointer;

   display: flex;
   flex-direction: column;
   width: 300px; /* 고정 너비 */

   flex-shrink: 0; /* 너비가 줄어들지 않도록 설정 */
`;

const CourseImage = styled.img`
   width: 100%;
   /* height: 200px; */
   aspect-ratio: 1/1;
   object-fit: cover;
   object-position: center;
   border-radius: 5px;
   margin-bottom: 7px;
`;

const CourseTitle = styled.div`
   font-size: 16px;
   font-weight: 500;
   margin-top: 7px;
`;

const CoursePrice = styled.div`
   margin-top: 2px;
   font-size: 14px;

   span {
      color: #6d6d6d;
      text-decoration: line-through;
      margin-right: 5px;
   }
`;

const CourseTagContainer = styled.div`
   display: flex;
   gap: 5px;
   margin-top: 2px;
`;

const CourseTag = styled.div`
   padding: 4px;
   font-size: 11px;
   font-weight: 600;
   color: white;
   background-color: #ff8255;
   border-radius: 5px;
`;