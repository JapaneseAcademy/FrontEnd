import styled from "styled-components"

const Loading = () => {
   return(
      <Wrapper>
         <LoadingGif src="/images/loading.gif" alt="loading-image" />
         <LoadingText>잠시만 기다려주세요...</LoadingText>
      </Wrapper>  
   )
}

export default Loading

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   padding-top: 100px;
`

const LoadingGif = styled.img`
   width: 5%;
`

const LoadingText = styled.div`
   font-size: 16px;
   margin-top: 20px;
`