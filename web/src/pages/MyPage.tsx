import { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getEnrollments, getUserInfo } from "../apis/userAPI";
import { convertCategory, numberWithCommas } from "../utils/utils";

type Enrollment = {
  enrollmentId: string;
  title: string;
  paymentDate: string;
  category: string;
  paymentAmount: number;
  // paymentMethod: string;
  mainImageUrl: string;
}

const MyPage = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const handleEditClick = () => {
    navigate('/mypage/edit')
  }

  useEffect(() => {
    //마이페이지 진입 시, 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    //accessToken이 없으면 홈페이지로 이동
    if (!localStorage.getItem('accessToken')) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/');
    }

    //이름 세팅
    getUserInfo().then((data) => {
      setName(data.name);
    })

    //강의 수강 내역 세팅
    getEnrollments().then((data) => {
      setEnrollments(data);
    })
  }, [])

  return (
    <Wrapper>
      <Header>마이페이지 <span onClick={handleEditClick}>내 정보 수정</span></Header>
      <ProfileContainer>
        <IoMdContact size={80} color="white"/>
        <br/>
        <GreetingText>
          <span style={{fontSize:'18px', textDecoration:'underline', fontWeight:'500'}}>{name}</span> 님, こんにちは !</GreetingText>
      </ProfileContainer>

      <MyCoursesContainer>
        <Header style={{fontSize:'20px', fontWeight:'450', marginBottom:'10px'}}>내 강의</Header>
        {enrollments.map((enrollment) => (
          <MyCourseCard key={enrollment.enrollmentId}>
            <CourseImage src={enrollment.mainImageUrl}/>
            <CourseInfo>
              <CourseTitle>{enrollment.title}</CourseTitle>
              <Text>결제일시 | {enrollment.paymentDate}</Text>
              <Text>강의유형 | {convertCategory(enrollment.category)}</Text>
              <Text>결제금액 | {numberWithCommas(enrollment.paymentAmount)}</Text>
              <Text>결제수단 | 카카오페이</Text>
            </CourseInfo>
          </MyCourseCard>
        ))}
      </MyCoursesContainer>
    </Wrapper>
  )
}

export default MyPage

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  width: 90%;
  font-size: 22px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    font-weight: 300;
    color: #7c7c7c;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #ff8255;
    }
  }
`

const ProfileContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff8255;
  padding: 25px 0;
  border-radius: 10px;
  margin-bottom: 20px;
`

const GreetingText = styled.div`
  font-size: 16px;
  color: white;
`

//////수강내역//////
const MyCoursesContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding-bottom: 10px;
`

const MyCourseCard = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  border-bottom: 1px solid #e1e1e1;
  gap: 20px;

  //마지막 카드에는 border-bottom 없애기
  &:last-child {
    border-bottom: none;
  }
`

const CourseTitle = styled.div`
  font-size: 17px;
  margin-top: 10px;
`

const CourseImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
`

const CourseInfo = styled.div`
  width: 90%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
`


const Text = styled.div`
  width: 100%;
  font-size: 13px;
  margin-top: 5px;
  color: #7c7c7c;
`