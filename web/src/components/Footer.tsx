import styled from 'styled-components'

const Footer = () => {
  return (
   <Wrapper>
      <Title>예리한 일본어</Title>
      <Info>상호명 : 예리한 일본어 | 대표자명 : 이예리</Info>
      <Info>사업자등록번호 : 292-02-03667</Info>
      <Info>주소 : 서울특별시 중구 충무로 24 남산센트럴뷰레지던스 2층 207호 </Info>
      <Info>Tel: 010-3551-6736</Info>
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
   padding-bottom: 25px;
   margin-top: 50px;
   gap: 2px;
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