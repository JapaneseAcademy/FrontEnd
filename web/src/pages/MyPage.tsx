import { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getEnrollments, getUserInfo } from "../apis/userAPI";

type Enrollment = {
  enrollmentId: string;
  courseTitle: string;
  paymentDate: string;
  courseType: string;
  price: string;
  paymentMethod: string;
  courseImage: string;
}

const MyPage = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const handleEditClick = () => {
    navigate('/mypage/edit')
  }

  //내 수강 내역 임시 데이터
  const myCourse = [
    {
      id: 1,
      title: '예리한 일본어 1급',
      date: '2025.02.25',
      type: '실시간 온라인',
      price: '100,000원',
      payment: '간편결제',
      image: '/images/courseBanner/course-banner-oneshot1.png'
    },
    {
      id: 2,
      title: '예리한 일본어 2급',
      date: '2025.02.25',
      type: '실시간 온라인',
      price: '100,000원',
      payment: '카드결제',
      image: '/images/courseBanner/course-banner-oneshot2.png'
    },
    {
      id: 3,
      title: '예리한 일본어 3급',
      date: '2025.02.25',
      type: '실시간 온라인',
      price: '100,000원',
      payment: '간편결제',
      image: '/images/courseBanner/course-banner-oneshot3.png'
    },
  ]

  useEffect(() => {
    //마이페이지 진입 시, 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    //이름 세팅
    getUserInfo().then((data) => {
      setName(data.name);
    })

    //강의 수강 내역 세팅
    getEnrollments().then((data) => {
      data.forEach((enrollment: any) => {
        const newEnrollment: Enrollment = {
          enrollmentId: enrollment.enrollmentId,
          courseTitle: enrollment.courseTitle,
          paymentDate: enrollment.paymentAt,
          courseType: enrollment.category,
          price: enrollment.paymentAmount,
          paymentMethod: enrollment.paymentMethod, //만들어달라고 해야함
          courseImage: enrollment.course.image //만들어달라고 해야함
        }
        setEnrollments((prev) => [...prev, newEnrollment]);
      }
      )
    })
  }
  , [])

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
        {myCourse.map((course) => (
          <MyCourseCard key={course.id}>
            <CourseImage src={course.image}/>
            <CourseInfo>
              <CourseTitle>{course.title}</CourseTitle>
              <Text>결제일시 | {course.date}</Text>
              <Text>강의유형 | {course.type}</Text>
              <Text>결제금액 | {course.price}</Text>
              <Text>결제수단 | {course.payment}</Text>
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