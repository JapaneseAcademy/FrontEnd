import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAdminCourseInfos } from "../../apis/adminAPI/adminCourseInfosAPI.ts"
import { convertTags, numberWithCommas } from "../../utils/utils.ts"

type courseInfo = {
  courseInfoId: number;
  title: string;
  descriptions: string[];
  baseCost: number;
  saleCost: number;
  mainImageUrl: string;
  level: string;

  live: boolean;
  online: boolean;
  recorded: boolean;
  liveOnline: boolean;
}

const Out_CourseInfoList = () => {
  const [courseInfos, setCourseInfos] = useState<courseInfo[]>([]);
  const [selectedCourseInfoId, setSelectedCourseInfoId] = useState<number>(1);

  const navigate = useNavigate();

  const selectedCourseInfo = courseInfos.find((courseInfo) => courseInfo.courseInfoId === selectedCourseInfoId);
  //live, online, recorded를 tags[] 형태로 변경
  const tags = convertTags(selectedCourseInfo?.live ?? false, selectedCourseInfo?.online ?? false, selectedCourseInfo?.recorded ?? false, selectedCourseInfo?.liveOnline ?? false);

  const handleCourseInfoClick = (courseInfoId: number) => {
    setSelectedCourseInfoId(courseInfoId);
  }

  useEffect(() => {
    getAdminCourseInfos(navigate).then((data) => {
      setCourseInfos(data);
    }
    );
  }, []);


  return (
    <Wrapper>
      <CourseListContainer id="course-list-container"> 
        <Title>강의 관리</Title>
        <CoursesTable id='courses-table'>
          <TableHeader>
            <TableHeaderItem id='courseName'>강의명</TableHeaderItem>
            <TableHeaderItem id='class'>썸네일</TableHeaderItem>
            <TableHeaderItem id='numOfStudents'>수강료</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {courseInfos.map((courseInfo) => (
              <TableRow 
                key={courseInfo.courseInfoId}
                onClick={() => handleCourseInfoClick(courseInfo.courseInfoId)}
                $isselected={selectedCourseInfoId === courseInfo.courseInfoId} 
              >
                <TableItem>{courseInfo.title}</TableItem>
                <TableItem><CourseImage style={{width:'60px', height:'60px', aspectRatio:'1/1'}} src={courseInfo.mainImageUrl} alt="course-image"/></TableItem>
                <TableItem>{numberWithCommas(courseInfo.baseCost)}원</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </CoursesTable>
      </CourseListContainer>

      <CourseDetailContainer id="course-detail-container">
        <DetailRow className='course-title'>
          <DetailTitle>강의명</DetailTitle>
          <DetailContent>{selectedCourseInfo?.title}</DetailContent>
        </DetailRow>
        <DetailRow className='course-cost'>
          <DetailTitle>수강료</DetailTitle>
          <DetailContent>{numberWithCommas(selectedCourseInfo?.baseCost ?? 0)}원</DetailContent>
        </DetailRow>
        <DetailRow className='course-main-image'>
          <DetailTitle>썸네일</DetailTitle>
          <DetailContent>
            <CourseImage src={selectedCourseInfo?.mainImageUrl} alt="대표 이미지" />
          </DetailContent>
        </DetailRow>
        <DetailRow className="course-detail-images">
          <DetailTitle>상세 이미지</DetailTitle>
          <DetailContent>
                {selectedCourseInfo?.descriptions.map((description, index) => (
                  <CourseImage key={index} src={description} alt="상세 이미지" />
                ))}
          </DetailContent>
        </DetailRow>
        <DetailRow className='course-type'>
          <DetailTitle>강의유형</DetailTitle>
          <DetailContent>
            {tags.map((tag, index) => (
              <CourseTag key={index}>{tag}</CourseTag>
            ))}
          </DetailContent>
        </DetailRow>
        <DetailRow className='course-level'>
          <DetailTitle>타입</DetailTitle>
          <DetailContent>
            <CourseTag style={{backgroundColor:'#61b58d'}}>{selectedCourseInfo?.level}</CourseTag>
          </DetailContent>
        </DetailRow>
      </CourseDetailContainer>

    </Wrapper>
  )
}

export default Out_CourseInfoList

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  //기본적으로 단어 단위 줄바꿈
  word-break: keep-all;
`

const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 50%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
`

const Title = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e1e1;
  font-weight: bold;
  font-size: 1.5rem;
`

const CoursesTable = styled.div`
  width: 90%;
  display: flex;
  height: 78%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #e1e1e1;
`

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #d7d7d7;
  font-size: 1rem;
  font-weight: 500;
`

const TableHeaderItem = styled.div`
  flex: 1; // ✅ 균등 분배
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid #e1e1e1; // ✅ 마지막 항목 제외
  }

  //첫번째 항목
  &:nth-child(1) {
    flex: 1.5;
  }
  //두번째 항목
  &:nth-child(2) {
    flex: 1.2;
  }
  //세번째 항목
  &:nth-child(3) {
    flex: 1;
  }
`;

const TableItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    border-right: 1px solid #e1e1e1; // ✅ 마지막 항목 제외
  }

  //첫번째 항목
  &:nth-child(1) {
    flex: 1.5;
  }
  //두번째 항목
  &:nth-child(2) {
    flex: 1.2;
  }
  //세번째 항목
  &:nth-child(3) {
    flex: 1;
  }

  //개행문자 처리
  white-space: pre-line;
  text-align: center;
`;

const TableBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.9rem;

  //넘어가면 스크롤 가능하도록
  overflow-y: scroll;
  height: 100%;
  //스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }

` 
const TableRow = styled.div<{ $isselected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 9px;
  padding-bottom: 9px;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  background-color: ${({ $isselected: $isSelected }) => ($isSelected ? "#e6f7ff" : "transparent")}; 
  
  &:hover {
    background-color: ${({ $isselected: $isSelected }) => ($isSelected ? "#cceeff" : "#f1f1f1")}; 
  }
`;


////////////////

const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  width: 50%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
  padding-top: 20px;
  padding-bottom: 10px;

  //넘어가면 스크롤 가능하도록
  overflow-y: scroll;
  height: 100%;
`

const DetailRow = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`

const DetailTitle = styled.div`
  width: 20%;
  font-weight: 500;
  font-size: 1rem;
  align-self: flex-start;
`

const DetailContent = styled.div`
  font-size: 0.9rem;
  border: 1px solid #e1e1e1;
  padding: 10px;
  width: 80%;
  border-radius: 5px;

  display: flex;
  //넘어가면 다음 줄로
  flex-wrap: wrap;
  gap: 5px;

  //텍스트 줄바꿈 처리
  white-space: pre-line;
`

const CourseImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`;

const CourseTag = styled.div`
  padding: 5px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background-color: #ff8255;
  border-radius: 5px;
`;

// const ButtonsContainer = styled.div`
//   width: 85%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-bottom: 20px;
// `

// const Button = styled.button`
//   width: 80px;
//   height: 35px;
//   background-color: #d7d7d7;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #636363;
//     color: #ffffff;
//   }
// `

// ////////Editmode 일 때////////
// const Input = styled.input`
//   width: 100%;
//   height: 30px;
//   border: 1px solid #e1e1e1;
//   border-radius: 5px;
//   padding: 5px;
//   font-size: 0.9rem;
//   outline: none;
//   box-sizing: border-box;
// `

// const PlusButton = styled.button`
//   justify-self: flex-end    ;
//   width: 30px;
//   height: 30px;
//   background-color: #d7d7d7;
//   margin-top: 10px;
//   border: none; 
//   border-radius: 5px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 0.6rem;

//   &:hover {
//     background-color: #636363;
//     color: #ffffff;
//   }
// `


// ////
// const Images = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 10px;
//   flex-wrap: wrap;
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #e1e1e1;
//   border-radius: 5px;
//   box-sizing: border-box;
// `;

// const ImageWrapper = styled.div`
//   position: relative;  /* ✅ 개별 이미지의 부모 요소를 기준으로 absolute 배치 */
//   display: inline-block;
// `;


// const DeleteImageButton = styled.button`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   width: 24px;
//   height: 24px;
//   background-color: rgba(230, 73, 73, 0.7);
//   border: none;
//   border-radius: 50%;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
//   color: white;
//   font-weight: bold;

//   &:hover 
//   {
//     background-color: rgba(230, 73, 73, 1);
//   }
// `;
