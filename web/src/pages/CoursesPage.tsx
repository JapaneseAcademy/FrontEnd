import { useNavigate } from 'react-router-dom';
import Main from '../components/Main'
import styled from 'styled-components'
import Course from '../components/Course';

const CoursesPage = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  }

  return (
    <>
      <Main>
        <Wrapper>
          <Title>
            예리 센세와 함께 일본어를 배워보세요!
          </Title>

          <CoursesContainer>
            <Course 
              Id={1}
              ImgUrl='/images/courseBanner/courseBanner1.png'
              Title="원샷반"
              Price="130,000원"/>
            <Course 
              Id={2}
              ImgUrl='/images/courseBanner/courseBanner1.png'
              Title="원샷반"
              Price="130,000원"/>
            <Course 
              Id={3}
              ImgUrl='/images/courseBanner/courseBanner1.png'
              Title="원샷반"
              Price="130,000원"/>
            <Course 
              Id={4}
              ImgUrl='/images/courseBanner/courseBanner1.png'
              Title="원샷반"
              Price="130,000원"/>
          </CoursesContainer>

        </Wrapper>
      </Main>
    </>
  )
}

export default CoursesPage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 40px;
  margin-top: 40px;
  width: 100%;
  color: #402900;
`

const CoursesContainer = styled.div`
  width: 100%;
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center;
  gap: 70px; // 각 코스 사이의 간격
`
