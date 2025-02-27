import axios from "axios";

export const getCourseReviewsByPage = async (courseId: string, page: string) => {
   console.log("[ getCourseReviews ]");
   try {
      const response = await axios.get(
         `${import.meta.env.VITE_BASE_URL}/api/v1/reviews?courseId=${courseId}&page=${page}`,);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}