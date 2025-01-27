import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface CourseProps {
   Id: number;
   ImgUrl: string;
   Title: string;
   Price: string;
}

const Course = ({ Id, ImgUrl, Title, Price }: CourseProps) => {
   const navigate = useNavigate();

   const handleCourseClick = () => {
      navigate(`/courses/${Id}`); // 해당 Course의 ID로 이동
   };

   return (
      <Wrapper onClick={handleCourseClick}>
         <CourseImage src={ImgUrl} alt={Title} />
         <CourseTitle>{Title}</CourseTitle>
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
   transition: transform 0.2s;

   &:hover {
      transform: scale(1.05); /* hover 시 살짝 확대 효과 */
   }
`;

const CourseImage = styled.img`
   width: 100%;
`;

const CourseTitle = styled.div`
   font-size: 20px;
   font-weight: 500;
   margin-top: 20px;
`;

const CoursePrice = styled.div`
   font-size: 16px;
   margin-top: 10px;
`;
