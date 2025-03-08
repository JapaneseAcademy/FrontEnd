import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminReviewsByCourse = async (courseInfoId: number, page: number, navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/reviews?courseInfoId=${courseInfoId}&page=${page-1}`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ getAdminReviewsByCourse ]",response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
      // 관리자가 아닐 경우: error.status === 403 || error.status === 401
      if (error.status === 403 || error.status === 401) {
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
}

//리뷰 불러오는데 쓰일 courseInfo title 불러오는 api  
export const getAdminCourseInfoTitles = async () => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/titles`);
      console.log("[ getAdminCourseInfoTitle ]",response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
   }
}