import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
   <Wrapper>
      호매실간호학원

상호 : 호매실간호학원 ㅣ 사업자등록번호 : 117-98-72852 ㅣ 대표자 : 조승연
주소 : 경기 수원시 권선구 금곡로 202 606호 ㅣ Tel : 031-548-1575
   </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
   width: 100%;
   
   border: 1px solid blue;
   `