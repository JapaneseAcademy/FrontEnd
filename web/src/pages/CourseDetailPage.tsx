import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { getCourseReviewsByPage } from "../apis/reviewAPI";
import { getCourseDetail } from "../apis/courseAPI";
import { convertTags } from "../utils/utils";

// type Review = {
//   reviewId: string;

//   reviewImage: string;
//   reviewCourse: string;
//   reviewTitle: string;
//   reviewText: string;
//   reviewDate: string;
//   reviewName: string;
//   isAnonymous: boolean;
// }


const CourseDetailPage = () => {
  const [selectedOption, setSelectedOption] = useState("detail");
  const [currentPage, setCurrentPage] = useState(1);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  // const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  const reviewsPerPage = 5; // ✅ 한 페이지당 리뷰 개수
  const navigate = useNavigate();
  const courseId = String(useParams().courseId);

  const handleReviewClick = (reviewId: string) => {
    navigate(`/review?reviewId=${reviewId}`);
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setCurrentPage(1); // ✅ 탭을 변경하면 첫 페이지로 리셋
  };
  
  const handleReviewWriteClick = () => {
    navigate('writeReview');
  }


  const reviewTexts = [
    "수업이 너무 재밌어요! 선생님도 친절하시고, 함께 공부하니까 더 즐거워요. 어쩌구저쩌구 텍스트가 넘어간다. 어쩌구저쩌구 텍스트가 넘어간다. 어쩌구저쩌구 텍스트가 넘어간다.",
    "강의가 체계적이고 이해하기 쉬워요. 강력 추천합니다!",
    "처음엔 어려웠는데 선생님 설명 덕분에 일본어가 재미있어졌어요!",
    "수업 분위기가 좋아서 부담 없이 공부할 수 있었어요!",
    "친구랑 같이 수강했는데 너무 유익했어요. 다음에도 듣고 싶어요!",
    "문법 설명이 자세하고 실전 연습도 많아서 실력이 많이 늘었어요.",
    "온라인 강의지만 정말 오프라인처럼 생생한 수업이에요!",
    "교재와 함께 진행되는 방식이 좋아서 복습하기 편했어요.",
    "발음 교정이 특히 유익했어요. 일본어 발음이 많이 개선됐어요.",
    "자주 틀리는 부분을 정확하게 짚어주셔서 도움이 됐어요.",
    "선생님이 학생들을 정말 잘 챙겨주셔서 만족스러웠어요!",
    "진짜 후회 없는 선택! 일본어 기초 확실히 다질 수 있었어요!",
  ];
  
  const reviews = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    user: `user${i + 1}`,
    date: `2023.12.${String(i + 1).padStart(2, "0")}`,
    text: reviewTexts[i % reviewTexts.length], // ✅ 리스트에서 랜덤한 리뷰 내용 사용
  }));
  

  // ✅ 현재 페이지의 리뷰만 표시
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // ✅ 페이지 번호 생성
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    // 페이지 로드 시 상단으로 이동
    // window.scrollTo(0, 0); // 완성 시에 활성화. 개발할때는 불편해서 {todo}

    //1) 강의 상세정보 API 호출
    getCourseDetail(courseId).then((data) => {
      //{todo: 요일 드롭다운 세팅}
      //{todo: 시간 드롭다운 세팅}
      setCourseTypes(convertTags(data.isLive, data.isOnline, data.isRecorded));
    });


    //2) 강의별 후기 API 호출(페이지 1은 미리 세팅)
    getCourseReviewsByPage(courseId, "1").then((data) => { //{todo: 페이지 수 정확하게}
      console.log(data);
    }
    );
    
  }, [courseId]);

  useEffect(() => {
    console.log("courseTypes:", courseTypes);
  }
  , [courseTypes]);

  return (
    <>
      <Wrapper>
        <CourseImage src="/images/courseBanner/course-banner-oneshot1.png" alt="Course Image" />
        <CourseTitle>[기초문법+회화] 원샷반</CourseTitle>
        <CoursePrice>130,000원</CoursePrice>
        <DropDownContainer>
          <Dropdown>
            <DropDownTitle>요일</DropDownTitle>
            <DropDownContent>
              <option>월수금</option>
              <option>화목토</option>
          </DropDownContent>
        </Dropdown>
        <Dropdown>
          <DropDownTitle>시간</DropDownTitle>
          <DropDownContent>
            <option>10:00 ~ 11:30</option>
            <option>14:00 ~ 15:30</option>
          </DropDownContent>
        </Dropdown>
        <Dropdown>
          <DropDownTitle>유형</DropDownTitle>
          <DropDownContent onChange={(e) => console.log(e.target.value)}>
            {courseTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </DropDownContent>
        </Dropdown>
        </DropDownContainer>

        <OptionContainer>
          <Option
            selected={selectedOption === "detail"}
            onClick={() => handleOptionClick("detail")}
          >
            상세정보
          </Option>
          <Option
            selected={selectedOption === "review"}
            onClick={() => handleOptionClick("review")}
          >
            수강후기
          </Option>
        </OptionContainer>


        <CourseDetailContainer id='course_detail_container'>
          <CourseDetailContent selected={selectedOption === "detail"}>
            <CourseDetailImage src="/images/courseDetail/course-detail-1.png" alt="Course Image" />
            <CourseDetailImage src="/images/courseDetail/course-detail-2.png" alt="Course Image" />
            <CourseDetailImage src="/images/courseDetail/course-detail-3.png" alt="Course Image" />
            <CourseDetailImage src="/images/courseDetail/course-detail-4.png" alt="Course Image" />
          </CourseDetailContent>

          <CourseDetailContent id='course_review_container' selected={selectedOption === "review"}>
            <WriteReviewBtn onClick={handleReviewWriteClick}>
              <HiOutlinePencilSquare size={15} style={{ marginRight: "5px" }} />
              수강 후기 작성하기
              </WriteReviewBtn>
            <ReviewContainer>
              {currentReviews.map((review) => (
                <Reviewcard key={review.id} onClick={()=>handleReviewClick(review.id.toString())}>
                  <ReviewImage src="/images/3.jpg" />
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "5px" }}>
                    <UserAndDate>
                      <ReviewCourse>원샷반1</ReviewCourse>
                    </UserAndDate>
                    <ReviewTitle>세계 최고의 일본어 강의!</ReviewTitle>
                    <ReviewText>{review.text}</ReviewText>
                    <UserAndDate>
                      <ReviewCourse>{review.date}</ReviewCourse>
                      <ReviewCourse>sb31******</ReviewCourse>
                    </UserAndDate>                  
                    </div>
                </Reviewcard>
              ))}
            </ReviewContainer>

            {/* 페이지네이션 버튼 */}
            <Pagination>
              {pageNumbers.map((number) => (
                <PageButton key={number} onClick={() => setCurrentPage(number)} active={currentPage === number}>
                  {number}
                </PageButton>
              ))}
            </Pagination>
          </CourseDetailContent>
        </CourseDetailContainer>

              {/* 하단 고정 버튼 */}
      <FixedButtonContainer>
        {/* <CartButton id="cart_btn">장바구니</CartButton> */}
        <BuyButton id="buy_btn">신청하기</BuyButton>
      </FixedButtonContainer>
      </Wrapper>


    </>
  );
};

export default CourseDetailPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const CourseImage = styled.img`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CourseTitle = styled.div`
  width: 90%;
  font-size: 18px;
  font-weight: 500;
`;

const CoursePrice = styled.div`
  width: 90%;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff; /* 버튼 배경 */
  padding: 10px 0;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.05);
  z-index: 1000; 
`;

// const CartButton = styled.button`
//   width: 45%;
//   background-color: #ffffff;
//   border: 1px solid #d3d3d3;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

const BuyButton = styled.button`
  width: 90%;
  background-color: #ff8255;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #d76d47;
  }
`;

const OptionContainer = styled.div`
  width: 90%;
  display: flex;
  height: 50px;
  margin-top: 30px;
  border: 1px solid #e1e1e1;
`;

const Option = styled.div<{ selected: boolean }>`
  width: 50%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#333" : "#d3d3d3")};
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  border-bottom: ${({ selected }) => (selected ? "2px solid #333" : "none")};

  &:hover {
    color: #000;
  }

  &:first-child {
    border-right: 1px solid #d3d3d3;
  }
`;


const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 10px;
`;

const CourseDetailContent = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  display: ${({ selected }) => (selected ? "block" : "none")};
  margin-top: 10px;

  h2 {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const CourseDetailImage = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  border: 1px solid #e1e1e1;

`;

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

  //마지막 카드에는 border-bottom 없애기
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  object-fit: cover;
  
`;


const ReviewCourse = styled.div`
  font-size: 12px;
  color: #707070;
`;

const ReviewTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  display: flex;
  margin-bottom: 5px;

  span {
    font-size: 12px;
    color: #707070;
    font-weight: 300;
    margin-left: auto;
  }
`;

const ReviewText = styled.div`
  font-size: 14px;

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


const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;

const PageButton = styled.button<{ active: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${({ active }) => (active ? "#ff8255" : "#e1e1e1")};
  background-color: ${({ active }) => (active ? "#ff8255" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};

  &:hover {
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
    color: #fff;
  }
`;

///dropdown
const DropDownContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 25px;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  gap: 30px;
`;

const DropDownTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const DropDownContent = styled.select`
  width: 220px;
  height: 30px;
  text-align: center;
  font-size: 12px;
  border: 1px solid #e1e1e1;
  border-radius: 20px;
  padding: 5px;

  &:hover {
    background-color: #f1f1f1;
  }
`;


///수강후기 작성하기 버튼
const WriteReviewBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #7f7f7f; */
  background-color: none;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #232323;
    color: #fff;
  }
`;