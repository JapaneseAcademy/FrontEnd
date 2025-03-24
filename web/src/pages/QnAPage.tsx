import { useState } from 'react'
import Main from '../components/Main'
import styled, {keyframes} from 'styled-components'
import { Helmet } from 'react-helmet-async'

const QnAPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('course')

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <>
      <Helmet
        title="FAQ - 예리한 일본어"
        meta={[
            {
              name: "description",
              content: "예리한 일본어 수강생들이 자주 묻는 질문을 모아놨어요. 궁금한 점이 있으시다면 아래 내용을 참고해주세요.",
            },
        ]}
        link={[{ rel: "canonical", href: "https://www.yeri-jp.com/qna" }]}
      />

      <Main>
        <Banner>
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
                <option value="course">수강문의</option>
                <option value="refund">변경/환불</option>
                <option value="apply">수강신청</option>
                <option value="payment">결제 및 교재 구매</option>
                <option value="consult">방문 및 상담</option>
              </CategoryDropdown>
              <AnswerContainer id="course" style={{display: selectedCategory === 'course' ? 'flex' : 'none'}}>
                <Question>Q. [수강일정] 개강일과 종강일이 언제인가요?</Question>
                <Answer>A. 매월 다릅니다! 다음달 수강신청 기간에 날짜가 함께 공지됩니다. </Answer>
                <Question>Q. [강의유형] 실시간 온라인이나 녹화본 수업이 무엇인가요? </Question>
                <Answer>
                  A. 두 가지 모두 시공간적인 제약에서 벗어났으나, 일반 인터넷강의보다 훨씬 현장감 있는 강의 유형입니다. <br/><br/>
                  <span>실시간 온라인</span> <br/> 현장강의 수강생들과 함께 정해진 시간에 온라인으로 들어와 수강. 똑같이 발표 및 듣기 참여 가능. 줌링크는 매월 첫 수업일 전달드립니다. <br/><br/>
                  <span>VOD녹화본 수업</span> <br/> 현장강의를 그대로 녹화해서 보내드리는 수업. 당일 수업 후 보내드리며 보내드린 7일 간 무제한 수강 가능한 강의! 개강일을 놓쳤어도 당연히 등록 가능합니다.
                </Answer>
                <Question>Q. 출석확인증 발급은 어떻게 하나요?</Question>
                <Answer>A. 필요하신 분은 카카오 문의, 혹은 직접 말씀해주시면 환불 가능 기간이 지난 후 발급해드리겠습니다.</Answer>
              </AnswerContainer>
              <AnswerContainer id="refund" style={{display: selectedCategory === 'refund' ? 'flex' : 'none'}}>
                <Answer>
                저희 ‘예리한 일본어’는, 기초문법+회화 원샷반의 경우 2인~10인 이하, <br/>
                회화반의 경우 3인~10인 이하로 제한하여 운영하고 있습니다. <br/>
                등록일 이후 결제순으로 마감이 진행되고 있기 때고 3인 미만인 경우 폐강이 됩니다. <br/><br/>

                - 결석 2회는 영상도 무료 제공 되니, 본인 스케줄을 꼭 확인 후 수강신청 해주시길 바랍니다!<br/><br/>

                <span style={{fontWeight:'bold'}}>[수강신청 인원이 3인일 경우 개강 전 환불 규정] </span><br/>
                수강인원이 2인이 되면 폐강 되므로 수업 시작시간 기준 72시간 이내에는 환불이 불가합니다. <br/>
                수강인원이 3인 이상이면 아래를 참고해주세요! <br/><br/>

                - 1회차 수업 시작시간 기준 72시간 이전: 100% 환불<br/>
                - 1회차 수업 시작시간 기준 72시간 이내: 환불 불가<br/><br/>

                --- <br/><br/>
                인원과 상관없는 환불 규정은 아래를 참고해주세요. 학원법 제18조 제2항을 따라 등록일 기준으로 진행됩니다.<br/>

                (일자별 환불은 진행되지 않습니다) <br/><br/>

                - 개강 전: 전액 환불<br/>
                - 총 교습시간 1/3 경과 전: 납부 수강료 2/3 환불<br/>
                - 총 교습시간의 1/2 경과 전: 납부 수강료  1/2 환불<br/>
                - 총 교습시간의 1/2 경과 후: 환불 불가
                

                </Answer>
                <Question>Q. 반을 변경하고 싶어요.</Question>
                <Answer>A. 마감 또는 폐강되지 않은 반에 한해 월 1회 이동 가능합니다. <br/>
                  (단, 본인의 이동으로 해당 반이 3인 미만이 될 경우 불가합니다)
                </Answer>                
              </AnswerContainer>
              <AnswerContainer id="apply" style={{display: selectedCategory === 'apply' ? 'flex' : 'none'}}>
                <Question>Q. 수강신청은 언제 하나요? </Question>
                <Answer>
                  A. 현장강의의 경우 인원이 마감되지 않은 경우 언제든 가능합니다만,  <br/>
                  지난 강의의 제공에 대해서는 별도의 영상신청이 필요합니다.  <br/>
                  이 부분은 문의 주세요! 녹화본 수업은 365일 상시입니다! ^^
                </Answer>
                <Question>Q. 방문 수강신청 및 상담은 몇시에 가능한가요? </Question>
                <Answer>
                  A. 선생님의 수업시간은 매월 바뀌는 관계로, 정해진 시간을 안내해 드리기가 어렵습니다. <br/>
                  미리 문의주시고 오시면 감사하겠습니다! <br/>
                  (홈페이지 우측 하단 카카오 문의 or 카카오 'yells77' 친구추가)
                </Answer>
                <Question>Q. 강의 시간표를 확인하고 싶어요! </Question>
                <Answer>
                  A. ‘예리한 일본어’는 현장강의 베이스의 학원이기 때문에, 매월 시간표가 변경됩니다.  <br/>
                  익월 수강시간표는 해당 홈페이지 수강과목 캘린더와, 등록기간에 학원 카카오 계정 프로필과 인스타그램에서 확인하실 수 있습니다.
                </Answer>
              </AnswerContainer>
              <AnswerContainer id="payment" style={{display: selectedCategory === 'payment' ? 'flex' : 'none'}}>
                <Question>Q. 교재는 어떤 것을 사용하나요? </Question>
                <Answer>
                  <span style={{fontWeight:'bold'}}>원샷반</span> <br/> 약 2년 이상 파*다 어학원에서도 함께 사용했던 예리센세의 자체교재로 수업이 진행됩니다. <br/> <br/>
                  <span style={{fontWeight:'bold'}}>회화반</span> <br/> 교재를 사용하지 않고 매주 다양한 프린트가 자료로 나갑니다.
                </Answer>
                <Question>Q. 교재는 어떻게 구매하나요? </Question>
                <Answer>
                  A. ‘수강생’만 현장 구매 가능하며, <br/>
                  온라인 수강생 배송은 따로 문의 주시면 구매 폼을 전달해드리겠습니다.
                </Answer>
                <Question>Q. 개강일보다 늦게 수강신청을 하면 전액 결제가 되나요? </Question>
                <Answer>
                  A.  <br/>
                  <span style={{fontWeight:'bold'}}>지나간 수업에 대한 영상 제공을 받지 않는 경우 </span> → 지나간 수업일만큼 할인적용  <br/>
                  <span style={{fontWeight:'bold'}}>지나간 수업에 대한 영상을 그대로 제공받는 경우 </span> → 전액 결제
                </Answer>
                <Question>Q. 결제수단은 어떻게 되나요? </Question>
                <Answer>
                  A. 무통장입금, 카드 결제 가능합니다. 
                </Answer>
              </AnswerContainer>
              <AnswerContainer id="consult" style={{display: selectedCategory === 'consult' ? 'flex' : 'none'}}>
                <Question>[온라인 문의]</Question>
                <Answer>A. 카카오톡 yells77 혹은 홈페이지 우측 하단에 있는 카카오 버튼을 눌러주시면 언제든 문의를 남겨두실 수 있습니다!</Answer>
                <Question>[오프라인 문의 및 상담]</Question>
                <Answer>A. 월~토 근무 중이며 매달 시간표에 따라 상이합니다. 방문 시 사전 연락 주시면 감사하겠습니다! </Answer>

              </AnswerContainer>
            </ContentText>
        </Content>
      </Main>
  </>
  )
}

export default QnAPage

/* 아래에서 위로 올라오는 애니메이션 정의(재사용 가능) */
const fadeInUp = keyframes`
  from {
    transform: translateY(20px); /* 아래에서 시작 */
    opacity: 0; /* 투명하게 시작 */
  }
  to {
    transform: translateY(0); /* 제자리로 */
    opacity: 1; /* 완전히 표시 */
  }
`;

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
  color: #ffffff;
  margin-bottom: 50px;
  
  /* 애니메이션 적용 */
  animation: ${fadeInUp} 0.5s ease-out;
`

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
  /* text-align: center; */

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
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
  }
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
  font-size: 15px;
  margin-bottom: 10px;
  border-top: 1px solid #ababab;
  border-bottom: 1px solid #ababab;
  padding: 10px 0;
`

const Answer = styled.div`
  width: 100%;
  font-size: 13px;
  margin-bottom: 40px;
  //왼쪽 정렬
  text-align: left;

  span {
    font-weight: 600;
    font-size: 14px;
    color: #000000;
  }
`

