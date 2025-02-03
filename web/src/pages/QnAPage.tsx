import { useState } from 'react'
import Main from '../components/Main'
import styled from 'styled-components'

const QnAPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('course')

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <>
      <Main>
        <Banner>
          {/* <BannerImage src='images/hiragana.png'/> */}
          <BannerText>
            자주 묻는 질문을 모아놨어요. 
            <br/>
            궁금한 점이 있으시다면 아래 내용을 참고해주세요.
          </BannerText>
        </Banner>

        <Line/>

        <Content>
          <ContentTitle>FAQ</ContentTitle>
            <ContentText>
              <CategoryDropdown value={selectedCategory} onChange={handleCategoryChange}>
                <option value="course">수강일정</option>
                <option value="refund">환불규정</option>
                <option value="apply">수강신청</option>
                <option value="payment">결제</option>
                <option value="consult">상담가능시간</option>
              </CategoryDropdown>
              <AnswerContainer id="course" style={{display: selectedCategory === 'course' ? 'flex' : 'none'}}>
                <Question>Q. [수강일정] 개강일과 종강일이 언제인가요?</Question>
                <Answer>A. 개강일은 1월 1일, 종강일은 12월 31일입니다.</Answer>
                <Question>Q. [수강일정] 개강일과 종강일이 언제인가요?</Question>
                <Answer>A. 개강일은 1월 1일, 종강일은 12월 31일입니다.</Answer>
                <Question>Q. [수강일정] 개강일과 종강일이 언제인가요?</Question>
                <Answer>A. 개강일은 1월 1일, 종강일은 12월 31일입니다.</Answer>
              </AnswerContainer>
              <AnswerContainer id="refund" style={{display: selectedCategory === 'refund' ? 'flex' : 'none'}}>
                <Question>Q. [환불규정] 환불이 가능한 경우가 있나요?</Question>
                <Answer>A. 환불은 개강일 이전까지만 가능합니다.</Answer>
                <Question>Q. [환불규정] 환불이 가능한 경우가 있나요?</Question>
                <Answer>A. 환불은 개강일 이전까지만 가능합니다.</Answer>
                <Question>Q. [환불규정] 환불이 가능한 경우가 있나요?</Question>
                <Answer>A. 환불은 개강일 이전까지만 가능합니다.</Answer>
              </AnswerContainer>
              <AnswerContainer id="apply" style={{display: selectedCategory === 'apply' ? 'flex' : 'none'}}>
                <Question>Q. [수강신청] 수강신청은 어떻게 하나요?</Question>
                <Answer>A. 홈페이지에서 수강신청을 하실 수 있습니다.</Answer>
                <Question>Q. [수강신청] 수강신청은 어떻게 하나요?</Question>
                <Answer>A. 홈페이지에서 수강신청을 하실 수 있습니다.</Answer>
                <Question>Q. [수강신청] 수강신청은 어떻게 하나요?</Question>
                <Answer>A. 홈페이지에서 수강신청을 하실 수 있습니다.</Answer>
              </AnswerContainer>
              <AnswerContainer id="payment" style={{display: selectedCategory === 'payment' ? 'flex' : 'none'}}>
                <Question>Q. [결제] 결제는 어떻게 하나요?</Question>
                <Answer>A. 카드결제와 계좌이체가 가능합니다.</Answer>
                <Question>Q. [결제] 결제는 어떻게 하나요?</Question>
                <Answer>A. 카드결제와 계좌이체가 가능합니다.</Answer>
                <Question>Q. [결제] 결제는 어떻게 하나요?</Question>
                <Answer>A. 카드결제와 계좌이체가 가능합니다.</Answer>
              </AnswerContainer>
              <AnswerContainer id="consult" style={{display: selectedCategory === 'consult' ? 'flex' : 'none'}}>
                <Question>Q. [상담가능시간] 상담이 가능한 시간이 언제인가요?</Question>
                <Answer>A. 평일 9시~18시까지 상담이 가능합니다.</Answer>
                <Question>Q. [상담가능시간] 상담이 가능한 시간이 언제인가요?</Question>
                <Answer>A. 평일 9시~18시까지 상담이 가능합니다.</Answer>
                <Question>Q. [상담가능시간] 상담이 가능한 시간이 언제인가요?</Question>
                <Answer>A. 평일 9시~18시까지 상담이 가능합니다.</Answer>
              </AnswerContainer>
            </ContentText>
        </Content>
      </Main>
  </>
  )
}

export default QnAPage

const Banner = styled.div`
  width: 100%;
  background-image: url('/images/1.jpg');
  background-size: cover;
  background-position: center; 
  background-blend-mode: overlay; 
  background-color: rgba(0, 0, 0, 0.3);

  justify-content: center;
  align-items: center;
  text-align: center;
  height: 300px;
  font-size: 20px;
  padding: 40px;
  margin-top: 30px;
  color: #ffffff;
  margin-bottom: 50px;
  
`

// const BannerImage = styled.img`
//   width: 40%;
//   margin-bottom: 10px;
// `

const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  height: 100%;
` 


const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ababab;
  /* margin-top: 50px;
  margin-bottom: 50px; */
`

const Content = styled.div`
  width: 90%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 50px;
`

const ContentText = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  span {
    font-size: 13px;
    margin-top: 10px;
    color: #7c7c7c;
  }
`

const ContentTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`

const CategoryDropdown = styled.select`
  width: 150px;
  height: 35px;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  border: 1px solid #ababab;
  margin-bottom: 30px;
`


const AnswerContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

`

const Question = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  border-top: 1px solid #ababab;
  border-bottom: 1px solid #ababab;
  padding: 10px 0;
`

const Answer = styled.div`
  width: 100%;
  font-size: 13px;
  margin-bottom: 30px;
`

