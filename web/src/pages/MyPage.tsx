import { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getEnrollments, getMyReviews, getUserInfo } from "../apis/userAPI";
import { convertCategory, numberWithCommas } from "../utils/utils";

type Enrollment = {
  enrollmentId: number;
  title: string;
  paymentDate: string;
  category: string;
  paymentAmount: number;
  method: string;
  mainImageUrl: string;
  reviewed: boolean;
  courseInfoId: number;
}

type Review = {
  reviewId: number;

  imageUrls: string[];
  review: string;
  writer: string;
  createdDate: string;
  reviewTitle: string;
  best: boolean;
}

const MyPage = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const handleEditClick = () => {
    navigate('/mypage/edit')
  }

  const handleReviewWrite = (enrollmentId: number, courseInfoId: number) => {
    navigate(`/writeReview?enrollmentId=${enrollmentId}&courseInfoId=${courseInfoId}`);
  }

  const handleReviewClick = (reviewId: number) => {
    navigate(`/review?reviewId=${reviewId}`);
  }

  useEffect(() => {
    //마이페이지 진입 시, 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    //accessToken이 없으면 홈페이지로 이동
    // if (!localStorage.getItem('accessToken')) {
    //   alert('로그인이 필요한 서비스입니다.');
    //   navigate('/');
    // }

    //이름 세팅
    getUserInfo().then((data) => {
      setName(data.name);
    })
    //강의 수강 내역 세팅
    getEnrollments().then((data) => {
      setEnrollments(data);
    })
    //나의 후기 세팅
    getMyReviews().then((data) => {
      setMyReviews(data.reviews);
    })
  }, [])
  //리뷰 세팅 확인
  useEffect(() => {
    console.log("리뷰 세팅 후:", myReviews);
  }
  , [myReviews]);

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
        <Header style={{fontSize:'20px', fontWeight:'450', marginBottom:'10px'}}>나의 강의</Header>
        {/* enrollment가 없을 때 */}
        {enrollments.length === 0 && (
        <div style={{fontSize:'14px', color:'#7c7c7c', marginTop:'auto', marginBottom:'auto'}}>아직 신청한 강의가 없어요!</div>
        )} 
        {enrollments.map((enrollment) => (
          <MyCourseCard key={enrollment.enrollmentId}>
            <CourseImage src={enrollment.mainImageUrl} alt="course-image"/>
            <CourseInfo>
              <CourseTitle>{enrollment.title}</CourseTitle>
              <Text>결제일시 | {enrollment.paymentDate}</Text>
              <Text>강의유형 | {convertCategory(enrollment.category)}</Text>
              <Text>결제금액 | {numberWithCommas(enrollment.paymentAmount)} 원</Text>
              <Text>결제수단 | {enrollment.method}</Text> 
              {/* reviewed가 false일 때만 후기 작성 버튼 보이기 */}
              { !enrollment.reviewed 
                ? <ReviewButton  onClick={()=>handleReviewWrite(enrollment.enrollmentId, enrollment.courseInfoId)}>후기 작성</ReviewButton> 
                : <ReviewComplete>후기 작성 완료</ReviewComplete> }
            </CourseInfo>
          </MyCourseCard>
        ))}
      </MyCoursesContainer>

      <MyCoursesContainer>
        <Header style={{fontSize:'20px', fontWeight:'450', marginBottom:'10px'}}>나의 후기</Header>
        {/* 후기가 없을 때 */}
        {enrollments.length === 0 && (
        <div style={{fontSize:'14px', color:'#7c7c7c', marginTop:'auto', marginBottom:'auto'}}>아직 작성한 후기가 없어요!</div>
        )} 
        {myReviews.map((review) => (
          <Reviewcard className='review-card' key={review.reviewId} onClick={() => handleReviewClick(review.reviewId)}>
            <ReviewImage src={review.imageUrls[0] ?? "/images/no-image.png"} alt="Review Image" />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "5px" }}>
              {/* <ReviewCourse> {courseTitle}</ReviewCourse> */} {/* TODO: courseTitle이 없어서 주석처리 */}
              <ReviewTitle>
                { review.best &&
                <BestTag>BEST</BestTag> }
                <TitleText>{review.reviewTitle}</TitleText>
              </ReviewTitle>
              <ReviewText>{review.review}</ReviewText>
              <UserAndDate>
                <ReviewCourse>{review.createdDate}</ReviewCourse>
                <ReviewCourse>{review.writer}</ReviewCourse>
              </UserAndDate>
            </div>
          </Reviewcard>
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
  justify-content: flex-start;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin-bottom: 40px;
  padding-bottom: 10px;
  min-height: 200px;
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
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`

const CourseInfo = styled.div`
  width: 90%;
  height: 150px;
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

const ReviewButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #ff8255;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px; 
  /* align-self: center; */

  &:hover {
    background-color: #ff8255;
  }
`

const ReviewComplete = styled.div`
  width: 100px;
  height: 30px;
  background-color: #d6d6d6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 5px; 
  display: flex;
  align-items: center;
  justify-content: center;
`


//reviewcard(courseDetail.tsx에서 가져옴)

const Reviewcard = styled.div`
  width: 90%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid #e1e1e1;

  /// 마지막 카드에는 border-bottom 없애기
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  aspect-ratio: 1/1;
  margin-right: 10px;
  object-fit: cover;
  object-position: center;
  background-color: #f1f1f1; // 이미지 로딩 전 배경색
  border-radius: 5px;
`;


const ReviewCourse = styled.div`
  font-size: 12px;
  color: #707070;
`;

const BestTag = styled.div`
  width: 40px;
  font-size: 12px;
  color: #fff;
  background-color: #ff8255;
  padding: 2px 5px;
  border-radius: 5px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const ReviewTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex;
  gap: 5px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;

  // 세 줄 까지만 표현하고, 넘어가면 ... 으로 표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;

  // 높이가 정해진 경우, 넘치는 텍스트를 숨김
  -webkit-box-orient: vertical;
`;

const ReviewText = styled.div`
  font-size: 14px;
  color: #333;
  // 세 줄 까지만 표현하고, 넘어가면 ... 으로 표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;

  // 높이가 정해진 경우, 넘치는 텍스트를 숨김
  -webkit-box-orient: vertical;

  height: 60px;
  line-height: 20px;


`;


const UserAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


// const Pagination = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 15px;
//   gap: 10px;
// `;

// const PageButton = styled.button<{ $active: boolean }>`
//   width: 30px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   cursor: pointer;
//   border: 1px solid ${({ $active }) => ($active ? "#4d3e2c" : "#e1e1e1")};
//   background-color: ${({ $active }) => ($active ? "#4d3e2c" : "#e1e1e1")};
//   color: ${({ $active }) => ($active ? "#fff" : "#000")};

//   &:hover {
//     background-color: #f1f1f1;
//     border: 1px solid #f1f1f1;
//     color: #fff;
//   }
// `;
