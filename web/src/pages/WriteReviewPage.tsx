import { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { writeReview } from "../apis/reviewAPI";

const MAX_PHOTOS = 3;
const MAX_TITLE_LENGTH = 30;
const MAX_TEXT_LENGTH = 500;

const WriteReviewPage = () => {
   const [photos, setPhotos] = useState<File[]>([]);
   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
   const [reviewTitle, setReviewTitle] = useState<string>('');
   const [reviewText, setReviewText] = useState<string>('');
   const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
   const navigate = useNavigate();

   const enrollmentId = Number(new URLSearchParams(window.location.search).get('enrollmentId'));
   const courseInfoId = Number(new URLSearchParams(window.location.search).get('courseInfoId'));
   
   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.slice(0, MAX_TITLE_LENGTH);
      setReviewTitle(value);
   };
   
   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value.slice(0, MAX_TEXT_LENGTH);
      setReviewText(value);
   };


   const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsAnonymous(e.target.checked);
   };
   
   const handleSubmit = () => {
      try {
   
         // reviewTitle과 reviewText가 비어있을 경우 alert
         if (reviewTitle === '' || reviewText === '') {
            alert('후기 제목과 내용을 모두 입력해주세요.');
            return;
         }
         // reviewText가 10자 미만일 경우 alert
         if (reviewText.length < 10) {
            alert('후기 내용은 최소 10자 이상 입력해주세요.');
            return;
         }

         // review 작성 api
         writeReview(enrollmentId, reviewTitle, reviewText, isAnonymous, photos, navigate, courseInfoId);
         
         // 입력값 초기화
         setPhotos([]);
         setPreviewUrls([]);
         setReviewTitle("");
         setReviewText("");
         setIsAnonymous(false); // ✅ 익명 상태 초기화
   
      } catch (error) {
         console.error("후기 등록 중 오류 발생:", error);
         alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
      }
   };


   // 파일 선택 이벤트 핸들러
   const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const filesArray = Array.from(event.target.files);

      // 현재 업로드된 사진 개수 + 새로 추가할 사진 개수 제한
      if (photos.length + filesArray.length > MAX_PHOTOS) {
         alert(`최대 ${MAX_PHOTOS}장까지 업로드할 수 있습니다.`);
         return;
      }

      // 파일 URL 미리보기 생성
      const newPreviewUrls = filesArray.map((file) => URL.createObjectURL(file));
      
      // 기존 사진 + 새로 추가된 사진 저장
      setPhotos((prev) => [...prev, ...filesArray]);
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
   };

   useEffect(() => {
      // 불필요한 URL 객체 해제(메모리 누수 방지)
      return () => {
         previewUrls.forEach((url) => URL.revokeObjectURL(url));
      };
   }
   , [previewUrls]);

   
   return (
      <Wrapper>
         <Container id='photo-upload'>
            <Title>사진 업로드 <span>최대 {MAX_PHOTOS}장</span></Title>
            <PhotosContainer>
               {previewUrls.map((url, index) => (
                  <PhotoPreview key={index} src={url} alt={`Uploaded ${index}`} />
               ))}
               
               {/* 업로드 버튼 (최대 3장까지만 추가 가능) */}
               {photos.length < MAX_PHOTOS && (
                  <PhotoUploadButton>
                     <label htmlFor="photoInput">
                        <HiOutlinePlusCircle size={17} color="#b1b1b1" />
                        사진 업로드
                     </label>
                     <input
                        id="photoInput"
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={handlePhotoUpload}
                     />
                  </PhotoUploadButton>
               )}
            </PhotosContainer>
         </Container>

         <Container id='text'>
            <Title>후기 작성</Title>
            <TitleInput placeholder="후기 제목을 작성해주세요(최대 30자)" value={reviewTitle} onChange={handleTitleChange}/>
            <ReviewInput
               placeholder="후기를 작성해주세요(최대 500자)"
               value={reviewText}
               onChange={handleTextChange} 
            />
         </Container>

         <AnonymousCheckbox>
            익명으로 표시
            <input 
               type="checkbox" 
               id="anonymous"  
               checked={isAnonymous} 
               onChange={handleAnonymousChange} 
            />
         </AnonymousCheckbox>

         <SubmitButton onClick={handleSubmit}>후기 등록</SubmitButton>
      </Wrapper>
   );
};

export default WriteReviewPage;

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const Container = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin-top: 25px;
`;

const Title = styled.div`
   width: 100%;
   text-align: left;
   font-size: 18px;
   font-weight: 500;
   margin-bottom: 15px;

   span {
      font-size: 13px;
      font-weight: 400;
      color: #a0a0a0;
   }
`;

const PhotosContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   gap: 10px;
`;

const PhotoUploadButton = styled.div`
   width: 100px;
   height: 100px;
   border: 1px solid #e2e2e2;
   color: #b1b1b1;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border-radius: 7px;
   font-size: 13px;
   gap: 3px;
   cursor: pointer;
   position: relative;

   &:hover {
      background-color: #f8f8f8;
   }

   label {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
   }
`;

const PhotoPreview = styled.img`
   width: 100px;
   height: 100px;
   object-fit: cover;
   border-radius: 7px;
   border: 1px solid #e2e2e2;
`;

const TitleInput = styled.input`
   width: 100%;
   height: 45px;
   border: 1px solid #e2e2e2;
   padding: 15px;
   font-size: 13px;
   font-weight: 400;
   border-radius: 7px;
   margin-bottom: 15px;
`;

const ReviewInput = styled.textarea`
   width: 100%;
   height: 350px;
   border: 1px solid #e2e2e2;
   padding: 15px;
   font-size: 13px;
   font-weight: 400;
   border-radius: 7px;
   font-family: 'Pretendard';
   resize: none;
`;

const AnonymousCheckbox = styled.div`
   width: 90%;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   margin-top: 15px;
   font-size: 13px;
   color: #595959;

   input[type="checkbox"] {
      width: 15px;
      height: 15px;
      cursor: pointer;

   }
`;

const SubmitButton = styled.div`
   width: 90%;
   height: 45px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #ff8255;
   color: white;
   font-size: 15px;
   font-weight: 500;
   border-radius: 7px;
   margin-top: 25px;
   cursor: pointer;

   &:hover {
      background-color: #ff6f3f;
   }
`;
