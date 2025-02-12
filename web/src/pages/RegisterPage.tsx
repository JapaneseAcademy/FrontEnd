import styled from "styled-components"

const RegisterPage = () => {
   return (
      <Wrapper>
         <Title>회원 정보 등록</Title>
         <InputRow>
            <InputTitle>이름</InputTitle>
            <Input placeholder="이름을 입력해주세요" />
         </InputRow>
         <InputRow style={{flexDirection:'column', justifyContent:'space-between'}}>
            <InputTitle>생년월일</InputTitle>
            <Birth>
               <BirthInput id="year" placeholder="yyyy"/>
               <BirthInput id="month" placeholder="mm"/>
               <BirthInput id="day" placeholder="dd"/>
            </Birth>
         </InputRow>
         <InputRow>
            <InputTitle>전화번호</InputTitle>
            <Input placeholder="비밀번호를 입력해주세요" />
         </InputRow>
         <SubmitBtn>등록</SubmitBtn>
      </Wrapper>
   )
}

export default RegisterPage

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

const Title = styled.div`
   font-size: 20px;
   font-weight: 'bold';
   margin-top: 30px;
`

const InputRow = styled.div`
   width: 300px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   margin-top: 30px;
`

const InputTitle = styled.div`
   width: 100%;
   font-size: 13px;
   margin-right: 10px;
   text-align: left;
   margin-bottom: 5px;
   color: #333;
`

const Input = styled.input`
   width: 100%;
   height: 45px;
   padding: 0px 10px;
   border-radius: 10px;
   font-size: 13px;
   /* border: 1px solid #ababab; */
   border: none;
   background-color: #f4f4f4;
`

const BirthInput = styled.input`
   width: 30%;
   height: 45px;
   padding: 0px 10px;
   border-radius: 10px;
   font-size: 12px;
   border: none;
   background-color: #f4f4f4;
`

const Birth = styled.div`  
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 100%;
`

const SubmitBtn = styled.button`
   width: 300px;
   height: 50px;
   margin-top: 80px;
   background-color: #4d3e2c;
   color: white;
   border: none;
   border-radius: 10px;
   cursor: pointer;
   font-size: 15px;

   &:hover {
      background-color: #392a20;
   }
`