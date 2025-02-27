import styled from "styled-components"
import AdminYoutube from "./etc/AdminYoutube"
import { useState } from "react"

const Out_ChangeYoutube = () => {
  const [youtubeId, setYoutubeId] = useState<string>('8cFNCYoUsuk');

  const handleYoutubeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeId(e.target.value);
  }

  const handleYoutubeIdSubmit = () => {
    // {todo: 서버로 요청을 보내서 유튜브 ID 변경}
    if(youtubeId === '') {
      alert('유튜브 ID를 입력해주세요.');
      return;
    }

    //진짜로 바꿀건지 confirm
    if(!window.confirm('대표 유튜브 영상을 변경하시겠습니까?')) {
      return;
    }
  }

  return (
    <Wrapper>
      <AdminYoutube youtubeId={youtubeId}/>
      <YoutubeFormContainer>
        <Input type="text" placeholder="유튜브 영상의 ID를 입력하세요." onChange={handleYoutubeIdChange}/>
        <Notice>
          *유튜브 영상의 ID는 영상 URL에서 'v=' 뒤에 있는 문자열입니다.<br/>
          ID 입력 후 변경하려는 영상이 왼쪽에 정상적으로 나오지 않는다면 ID를 다시 확인해주세요. <br/>
          영상이 정상적으로 나오는지 확인한 후 변경 버튼을 눌러주세요.
        </Notice>
        <Button onClick={handleYoutubeIdSubmit}>변경</Button>
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
  gap: 10px;
`

const YoutubeFormContainer = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #dbdbdb;
  gap: 10px;
`

const Input = styled.input`
  width: 80%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  border: 1px solid #e1e1e1;
`

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: #f1f1f1;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e1e1e1;
  }
`

const Notice = styled.div`
  width: 80%;
  font-size: 0.7rem;
  color: #636363;
`