import styled from 'styled-components'

const Footer = () => {
  return (
   <Wrapper>
      <Title>예리한 일본어</Title>
      <Info>상호 : 예리한 일본어 | 대표자 : 이예리</Info>
      <Info>사업자등록번호 : 111-23-23498</Info>
      <Info>주소 : 서울시 동작구 흑석로 84 중앙대학교</Info>
      <Info>Tel: 010-1234-5678</Info>
      <Rights></Rights>

   </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background-color: #f8f8f8;
   padding: 20px;
   padding-top: 30px;
   padding-bottom: 30px;
   font-family: 'Pretendard-regular';
   `

const Title = styled.div`
   font-size: 16px;
   font-weight: 600;
   margin-bottom: 10px;
   color: #7d7d7d;
   `
const Info = styled.div`
   font-size: 12px;
   color: #9c9c9c;
   margin-bottom: 1px;
   `
const Rights = styled.div`
   font-size: 14px;
   `