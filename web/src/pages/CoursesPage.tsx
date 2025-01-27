import Main from '../components/Main'
import styled from 'styled-components'

const CoursesPage = () => {
  return (
    <>
      <Main>
        <Wrapper>
          <Title>
            예리 센세와 함께 일본어를 배워보세요!
          </Title>

          <CoursesContainer>
            <Course>
              <CourseImage src="/images/courseBanner/courseBanner1.png" />
              <CourseTitle>일본어 초급</CourseTitle>
              <CoursePrice>
                130,000원
              </CoursePrice>
            </Course>
            <Course>
              <CourseImage src="/images/courseBanner/courseBanner1.png" />
              <CourseTitle>일본어 초급</CourseTitle>
              <CoursePrice>
                130,000원
              </CoursePrice>
            </Course>
            <Course>
              <CourseImage src="/images/courseBanner/courseBanner1.png" />
              <CourseTitle>일본어 초급</CourseTitle>
              <CoursePrice>
                130,000원
              </CoursePrice>
            </Course>
            <Course>
              <CourseImage src="/images/courseBanner/courseBanner1.png" />
              <CourseTitle>일본어 초급</CourseTitle>
              <CoursePrice>
                130,000원
              </CoursePrice>
            </Course>
            <Course>
              <CourseImage src="/images/courseBanner/courseBanner1.png" />
              <CourseTitle>일본어 초급</CourseTitle>
              <CoursePrice>
                130,000원
              </CoursePrice>
            </Course>
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
  font-size: 22px;
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

const Course = styled.div`
  width: 100%;

`

const CourseImage = styled.img`
  width: 100%;
  border-radius: 10px;
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

