import axios from "axios";

//강의상세페이지에서 해당 강의의 후기 조회하는 api
export const getCourseReviewsByPage = async (courseInfoId: number, page: number) => {
   try {
      const response = await axios.get(
         `${import.meta.env.VITE_BASE_URL}/api/v1/courses/${courseInfoId}/reviews?page=${page-1}`,);
      console.log("[ getCourseReviews ]" ,response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

// 리뷰 상세 조회하는 api
export const getReviewDetail = async (reviewId: number) => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/reviews/${reviewId}`);
      console.log("[ getReviewDetail ]", response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

//메인 페이지의 베스트 후기 조회하는 api
export const getMainBestReviews = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/reviews/main`);
      console.log("[ getMainBestReviews ]", response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}