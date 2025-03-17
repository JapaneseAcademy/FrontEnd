import axios from "axios";

//강의상세페이지에서 해당 강의의 후기 조회하는 api
export const getCourseReviewsByPage = async (courseInfoId: number, page: number) => {
   try {
      const response = await axios.get(
         `${import.meta.env.VITE_BASE_URL}/api/v1/courses/${courseInfoId}/reviews?page=${page-1}`,);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

// 후기 상세 조회하는 api
export const getReviewDetail = async (reviewId: number) => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/reviews/${reviewId}`);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

//메인 페이지의 베스트 후기 조회하는 api
export const getMainBestReviews = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/reviews/main`);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

//전체 후기 조회하는 api
export const getAllReviews = async (page: number) => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/reviews?page=${page-1}`);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

//리뷰 작성하는 api
export const writeReview = async (
   enrollmentId: number,
   title: string,
   review: string,
   isAnonymous: boolean,
   images: File[],

   navigate: (path: string) => void,
   courseInfoId: number
) => {
   try {
      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환하여 추가
      const reviewData = {
         enrollmentId,
         title,
         review,
         isAnonymous
      };
      formData.append("request", new Blob([JSON.stringify(reviewData)], { type: "application/json" }));

      // 이미지 추가
      if (images && images.length > 0) {
         images.forEach((image) => {
            formData.append("images", image);
         });
      }

      await axios.post(
         `${import.meta.env.VITE_BASE_URL}/api/v1/reviews`,
         formData,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
               // "Content-Type"은 axios가 자동으로 설정하므로 필요 없음
            },
         }
      );

      alert("후기가 등록되었습니다.");
      navigate(`/courses/${courseInfoId}`);
   } catch (error: any) {
      console.error("Error creating review:", error.response ? error.response.data : error.message);
      alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
      throw error;
   }
};
