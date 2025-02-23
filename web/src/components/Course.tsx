import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface CourseProps {
   Id: number;
   ImgUrl: string;
   Title: string;
   Price: string;
   Tags: string[];
}

const Course = ({ Id, ImgUrl, Title, Price, Tags }: CourseProps) => {
   const navigate = useNavigate();

   const handleCourseClick = () => {
      navigate(`/courses/${Id}`); // 해당 Course의 ID로 이동
   };

   return (
      <Wrapper onClick={handleCourseClick}>
         <CourseImage src={ImgUrl} alt={Title} />
         <CourseTagContainer>
            {Tags.map((tag) => (
               <CourseTag key={tag}>{tag}</CourseTag>
            ))}
         </CourseTagContainer>
         <CourseTitle>{Title}</CourseTitle>
         <CourseTime>월,화 17:00-19:00</CourseTime>
         <CoursePrice>{Price}</CoursePrice>
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
   font-size: 20px;
   font-weight: 500;
   margin-top: 10px;
`;

const CourseTime = styled.div`
   font-size: 14px;
   margin-top: 3px;
   color: #333;
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