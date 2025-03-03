import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// import { HiOutlinePencilSquare } from "react-icons/hi2";
import { getCourseReviewsByPage } from "../apis/reviewAPI";
import { getCourseDetail } from "../apis/courseAPI";
import { convertTags, convertTime, convertWeekday, numberWithCommas } from "../utils/utils";

type Review = {
  reviewId: number;

  imageUrls: string[];
  review: string;
  writer: string;
  createdDate: string;
  reviewTitle: string;
}


//한 분반
type timeTable = {
  timeTableId: number; //분반 아이디
  timeBlocks: timeBlock[];
}
//한 타임블럭(분반 내)
type timeBlock = {
  weekday: string;
  startTime: string;
  endTime: string;
}


const CourseDetailPage = () => {
  const [selectedOption, setSelectedOption] = useState("detail");
  const [currentPage, setCurrentPage] = useState(1);

  //강의 정보들
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<number>(0);
  const [courseMainImage, setCourseMainImage] = useState<string>("");
  const [courseDetailImages, setCourseDetailImages] = useState<string[]>([]);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태 추가

  //분반 정보들
  const [convertedTimeTables, setConvertedTimeTables] = useState<string[]>([]);

  const navigate = useNavigate();
  const courseInfoId = parseInt(String(useParams().courseInfoId));

  const handleReviewClick = (reviewId: number) => {
    navigate(`/review?reviewId=${reviewId}`);
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setCurrentPage(1); // ✅ 탭을 변경하면 첫 페이지로 리셋
  };
  
  // const handleReviewWriteClick = () => {
  //   navigate('writeReview');
  // }

  const handleBuyClick = () => {
    alert("준비중입니다. 카카오톡으로 문의해주세요.")
  }

  //timeTables를 한 분반(timeTable)당 하나의 문자열로 바꾸는 함수
  const convertTimeTable = (timeTables: timeTable[]) => {
    return timeTables.map((timeTable) => 
      timeTable.timeBlocks.map((timeBlock) => 
        `${convertWeekday(timeBlock.weekday)} ${convertTime(timeBlock.startTime)}-${convertTime(timeBlock.endTime)}`
      ).join(" / ") // ✅ 각 timeBlock을 문자열로 변환 후 " / "로 연결
    );
  };


  useEffect(() => {
    // 페이지 로드 시 상단으로 이동
    window.scrollTo(0, 0); // 완성 시에 활성화. 개발할때는 불편해서 {todo}

    //1) 강의 상세정보 API 호출
    getCourseDetail(courseInfoId).then((data) => {
      setCourseTypes(convertTags(data.live, data.online, data.recorded));
      setCourseTitle(data.title);
      setCoursePrice(data.cost);
      setCourseMainImage(data.mainImageUrl);
      setCourseDetailImages(data.descriptions);
      setCourseLevel(data.level);

      //분반 정보 세팅
      setConvertedTimeTables(convertTimeTable(data.course.timeTables));
    });
    
  }, [courseInfoId]);

  //분반 세팅 확인
  useEffect(() => {
    console.log(convertedTimeTables);
  }
  , [convertedTimeTables]);

  /////////리뷰관련////////
  const fetchReviews = useCallback(async (page: number) => {
    try {
      const response = await getCourseReviewsByPage(courseInfoId, page);
      setCurrentReviews(response.reviews); // 받아온 리뷰 데이터 업데이트
      setTotalPages(response.totalPage); // 총 페이지 수 업데이트 (백엔드에서 제공)
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    }
  }, [courseInfoId]); // ✅ courseInfoId가 변경될 때만 새로운 fetchReviews 함수가 생성됨
  
  // ✅ 페이지 변경 시 새로운 리뷰 데이터를 요청
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchReviews(page);
  };
  // ✅ 페이지 로드 시 초기 데이터 가져오기
  useEffect(() => {
    fetchReviews(1); // 첫 페이지의 리뷰 데이터 요청
  }, [fetchReviews]); 

  return (
    <>
      <Wrapper>
        <CourseImage src={courseMainImage} alt="Course Image" />
        <CourseTitle>{courseTitle}</CourseTitle>
        <CoursePrice>{numberWithCommas(coursePrice)}원</CoursePrice>
        <DropDownContainer>
          <Dropdown>
            <DropDownTitle>난이도</DropDownTitle>
            <Tag>{courseLevel}</Tag>
          </Dropdown>
          <Dropdown>
            <DropDownTitle>분반</DropDownTitle>
            <DropDownContent>
              {convertedTimeTables.map((timeTable, index) => (
                <option key={index}>{timeTable}</option>
              ))}
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
            $selected={selectedOption === "detail"} // 변경된 부분
            onClick={() => handleOptionClick("detail")}
          >
            상세정보
          </Option>
          <Option
            $selected={selectedOption === "review"} // 변경된 부분
            onClick={() => handleOptionClick("review")}
          >
            수강후기
          </Option>
        </OptionContainer>


        <CourseDetailContainer id='course_detail_container'>
          <CourseDetailContent selected={selectedOption === "detail"}>
            {courseDetailImages.map((image, index) => (
              <CourseDetailImage key={index} src={image} alt="Course Detail Image" />
            ))}
          </CourseDetailContent>

          <CourseDetailContent id='course_review_container' selected={selectedOption === "review"}>
            {/* <WriteReviewBtn onClick={handleReviewWriteClick}>
              <HiOutlinePencilSquare size={15} style={{ marginRight: "5px" }} />
              수강 후기 작성하기
              </WriteReviewBtn> */}
            <ReviewContainer>
              {currentReviews.length === 0 ? (
                <NoReview>후기가 아직 없어요!</NoReview>
              ) : (
                currentReviews.map((review) => (
                  <Reviewcard key={review.reviewId} onClick={() => handleReviewClick(review.reviewId)}>
                    <ReviewImage src={review.imageUrls[0] ?? "/images/no-image.png"} alt="Review Image" />
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "5px" }}>
                      <ReviewCourse>{courseTitle}</ReviewCourse>
                      <ReviewTitle>
                        {/* {review.reviewTitle} */}
                        일이 사 오육칠 구십일이 사 오육칠 구십일이 사 오육칠 구십
                      </ReviewTitle>
                      <ReviewText>{review.review}</ReviewText>
                      <UserAndDate>
                        <ReviewCourse>{review.createdDate}</ReviewCourse>
                        <ReviewCourse>{review.writer}</ReviewCourse>
                      </UserAndDate>
                    </div>
                  </Reviewcard>
                ))
              )}
            </ReviewContainer>

            {/* 페이지네이션 버튼 */}
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <PageButton
                  key={number}
                  onClick={() => handlePageChange(number)}
                  $active={currentPage === number}
                >
                  {number}
                </PageButton>
              ))}
            </Pagination>
          </CourseDetailContent>
        </CourseDetailContainer>

              {/* 하단 고정 버튼 */}
      <FixedButtonContainer>
        {/* <CartButton id="cart_btn">장바구니</CartButton> */}
        <BuyButton id="buy_btn" onClick={handleBuyClick}>신청하기</BuyButton>
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
  aspect-ratio: 1/1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CourseTitle = styled.div`
  width: 90%;
  font-size: 18px;
  font-weight: 500;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 40px;
  height: 25px;
  font-weight: 300;
  color: white;
  background-color: #61b58d;
  border-radius: 5px;
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

const Option = styled.div<{ $selected: boolean }>`
  width: 50%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ $selected }) => ($selected ? "#333" : "#d3d3d3")};
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
  border-bottom: ${({ $selected }) => ($selected ? "2px solid #333" : "none")};

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

////리뷰//////

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

const ReviewTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  display: flex;
  margin-bottom: 5px;

  //두번째 줄까지만 표현하고, 넘어가면 ... 으로 표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;

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


const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;

const PageButton = styled.button<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? "#ff8255" : "#e1e1e1")};
  background-color: ${({ $active }) => ($active ? "#ff8255" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};

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
// const WriteReviewBtn = styled.button`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* background-color: #7f7f7f; */
//   background-color: none;
//   color: #333;
//   border: none;
//   padding: 10px 20px;
//   font-size: 13px;
//   cursor: pointer;

//   &:hover {
//     background-color: #232323;
//     color: #fff;
//   }
// `;

const NoReview = styled.div`
  font-size: 15px;
  color: #707070;
  margin-top: 40px;
  margin-bottom: 40px;
`;