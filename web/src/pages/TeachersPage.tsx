import styled from "styled-components"
import Main from "../components/Main"

const TeachersPage = () => {
  return (
    <>
      {/* <Header/> */}
      <Main>
        <Title>선생님 소개</Title>
      </Main>
      {/* <Footer/> */}
    </>
  )
}

export default TeachersPage

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
`