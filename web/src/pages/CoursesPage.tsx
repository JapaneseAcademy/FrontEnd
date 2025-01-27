import Main from '../components/Main'
import styled from 'styled-components'

const CoursesPage = () => {
  return (
    <>
      <Main>
        <Title>
          예리 쌤과 일본어를 배워보세요!
        </Title>
      </Main>
    </>
  )
}

export default CoursesPage

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`