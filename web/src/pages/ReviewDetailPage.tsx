import styled from "styled-components"

const ReviewDetailPage = () => {
   const handleBackButton = () => {
      window.history.back();
   }

   return (
      <Wrapper>
         <ReviewContainer>
            <Title>쉽고 재밌고 자연스럽게 일본어에 입문</Title>
            <NameAndDate>
               <SmallText>김똥개</SmallText>
               <SmallText>2021-09-01</SmallText>
            </NameAndDate>

            <ReviewContents>
               <ReviewImages>
                  <img src="/images/review/review1.jpg" alt="review" />
                  <img src="/images/review/review2.jpg" alt="review" />
                  <img src="/images/review/review3.jpg" alt="review" />
                  <img src="/images/review/review4.jpg" alt="review" />
               </ReviewImages>
                  <ReviewText>
                     쉽고 재미있게 그리고 자연스럽게 일본어에 입문할 수 있어요!
                     시험대비보다 생활 일본어가 공부하고 싶으면 최적화된 수업 같아요. 예리센세 수업은 그날 수업내용을 다양한 방법으로 가르쳐주시고 복습시켜 주는 형태의 수업이라 자연스럽게 머리에 녹아들 듯 공부가 되는 것 같아요. 단어를 눈으로 먼저 익히고 말해보고 써보고 문장을 만들어보는 형태로 자연스럽게 습득이 되요. 퀴즈 어플을 통해 재미있게 복습을 하고 또 일본어 책이나 노래 애니 등 실제 일본어 컨텐츠를 활용해서 예시를 많이 보여주셔서 더 귀에 쏙쏙 들어오고 실제 일본에서 쓰는 단어, 문화의 차이 등 그때그때 맞춰서 알려주셔서 실제 일본어 응용할 때 도움이 많이 될 것 같아요.
                     그리고 수업시간 외에도 그 주에 배운 내용을 토대로 톡방에 질문 해주셔서 계속 일본어가 익숙해지는데 도움이 많이 되요.
                     저는 온라인으로 강의를 들었는데도 톡방이나 쌤 개인톡으로도 적극적으로 잘 봐주셔서 수업 듣는데 전혀 어려움이 없었어요.
                  </ReviewText>
            </ReviewContents>
         </ReviewContainer>
         <BackButton onClick={handleBackButton}>뒤로 가기</BackButton>
      </Wrapper>
   )
}

export default ReviewDetailPage

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`

const ReviewContainer = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid #ebebeb;
   padding: 20px;
   margin: 20px;
`

const Title = styled.div`
   font-size: 18px;
   font-weight: 500;
   width: 100%;
   margin-bottom: 3px;
`

const NameAndDate = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
   border-bottom: 1px solid #c3c3c3;
   padding-bottom: 10px;
   margin-bottom: 20px;
`

const SmallText = styled.div`
   font-size: 13px;
   color: #979797;
`

const ReviewContents = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 100%;
`

const ReviewImages = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-bottom: 20px;

   img {
      width: 100%;
      height: auto;
   }
`

const ReviewText = styled.div`
   width: 100%;
   font-size: 14px;
   color: #707070;
`

const BackButton = styled.button`
   width: 90%;
   height: 40px;
   border: none;
   background-color: #402900;
   color: white;
   font-size: 14px;
   margin-top: 20px;
   cursor: pointer;

   &:hover {
      background-color: #5c3a29;
   }
`