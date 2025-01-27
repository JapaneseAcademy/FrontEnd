import styled from "styled-components"

interface CourseProps {
   ImgUrl: string;
   Title: string;
   Price: string;
}

const Course = ({ImgUrl, Title, Price} : CourseProps) => {
   return (
      <Wrapper>
         <CourseImage src={ImgUrl} />
         <CourseTitle>{Title}</CourseTitle>
         <CoursePrice>{Price}</CoursePrice>
      </Wrapper>
   )
}

export default Course


const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
`

const CourseImage = styled.img`
  width: 100%;
`

const CourseTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
`

const CoursePrice = styled.div`
  font-size: 16px;
  margin-top: 10px;
`

