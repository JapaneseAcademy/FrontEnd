import styled from "styled-components"
import AdminYoutube from "./etc/AdminYoutube"

const Out_ChangeYoutube = () => {
  return (
    <Wrapper>
      <AdminYoutube youtubeId="PxC5kDvxoSs"/>
      <YoutubeFormContainer>
        <Input type="text" placeholder="유튜브 링크를 입력하세요" />
        <Button>변경</Button>
      </YoutubeFormContainer>
    </Wrapper>
  )
}

export default Out_ChangeYoutube

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const YoutubeFormContainer = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  gap: 10px;
`

const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
`

const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: #f1f1f1;
  font-size: 0.8rem;
`