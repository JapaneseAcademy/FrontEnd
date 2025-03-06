import { useState } from "react"
import styled from "styled-components"
import { register } from "../apis/loginAPI"
import { useSetRecoilState } from "recoil"
import { loadingAtom } from "../recoil/loadingAtom"

const RegisterPage = () => {
   const [name, setName] = useState('')
   const [year, setYear] = useState('')
   const [month, setMonth] = useState('')
   const [day, setDay] = useState('')
   const [phone, setPhone] = useState('')
   const setIsloading = useSetRecoilState<boolean>(loadingAtom);

   const handleNameChange = (e: any) => {
      setName(e.target.value)
   }

   const handleYearChange = (e: any) => {
      setYear(e.target.value)
   }
   const handleMonthChange = (e: any) => {
      setMonth(e.target.value)
   }
   const handleDayChange = (e: any) => {
      setDay(e.target.value)
   }

   const handlePhoneChange = (e: any) => {
      setPhone(e.target.value)
   }

   const handleSubmit = () => {
      //예외처리 - 이름, 생년월일, 전화번호 입력 안했을 경우
      if(name === '' || year === '' || month === '' || day === '' || phone === '') {
         alert('모든 항목을 입력해주세요!')
         return
      }

      //예외처리 - 생년월일 숫자가 아닌 경우
      if(isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) {
         alert('생년월일은 숫자로 입력해주세요!')
         return
      }

      //예외처리 - 전화번호 숫자가 아닌 경우
      if(isNaN(Number(phone))) {
         alert('전화번호는 숫자만 입력해주세요!')
         return
      }

      //예외처리 - 생년월일 각 길이가 맞지 않는 경우
      if(year.length !== 4 || month.length !== 2 || day.length !== 2) {
         alert('생년월일을 형식에 맞게 정확히 입력해주세요!')
         return
      }

      //등록
      console.log(name, year, month, day, phone);
      register(name, phone, `${year}-${month}-${day}`, setIsloading);
   }


   return (
      <Wrapper>
         <Title>회원 정보 등록</Title>
         <InputRow>
            <InputTitle>이름</InputTitle>
            <Input placeholder="이름을 입력해주세요" onChange={handleNameChange} value={name}/>
         </InputRow>
         <InputRow style={{flexDirection:'column', justifyContent:'space-between'}}>
            <InputTitle>생년월일</InputTitle>
            <Birth>
               <BirthInput id="year" placeholder="yyyy" onChange={handleYearChange} value={year} maxLength={4}/>
               <BirthInput id="month" placeholder="mm" onChange={handleMonthChange} value={month} maxLength={2}/>
               <BirthInput id="day" placeholder="dd" onChange={handleDayChange} value={day} maxLength={2}/>
            </Birth>
         </InputRow>
         <InputRow>
            <InputTitle>전화번호</InputTitle>
            <Input placeholder="01012345678" onChange={handlePhoneChange} value={phone}/>
         </InputRow>
         <SubmitBtn onClick={handleSubmit}>등록</SubmitBtn>
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
   margin-top: 90px;
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
   margin-bottom: 90px;

   &:hover {
      background-color: #392a20;
   }
`