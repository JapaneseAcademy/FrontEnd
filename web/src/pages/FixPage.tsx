import styled from "styled-components"

const FixPage = () => {
  return (
    <Wrapper>
      <Image src="/images/fixing.jpg" alt="Fixing" />
    </Wrapper>
  )
}

export default FixPage

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 100%;
`

const Image = styled.img`
   width: 100%;
   object-fit: cover;
   margin-top: 70px;
`