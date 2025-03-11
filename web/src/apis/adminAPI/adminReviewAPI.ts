import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//강의 별로 후기 불러오는 api
export const getAdminReviewsByCourse = async (courseInfoId: number, page: number, navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/courses/${courseInfoId}/reviews?page=${page-1}`,
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

//후기 불러오는데 쓰일 courseInfo title 불러오는 api  
export const getAdminCourseInfoTitles = async () => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/titles`);
      console.log("[ getAdminCourseInfoTitle ]",response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
   }
}


////////////////////////후기 상태 설정///////////////////////

//후기 공개/비공개 처리하는 api
export const changeAdminReviewVisiblity = async (reviewId: number, navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/reviews/visibility?reviewId=${reviewId}`, {},
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ changeAdminReviewVisiblity ]",response.status);
      return response.status
   } catch (error: any) {
      console.error(error);
      if(error.response.status === 403 || error.response.status === 401){
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
}

//강의별 베스트 후기로 등록하는 api
export const setAdminBestCourseReview = async (reviewId: number, navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/reviews/best?reviewId=${reviewId}`, {},
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ setAdminBestCourseReview ]",response.status);
      return response.status;
   } catch (error: any) {
      console.error(error);
      if(error.response.status === 403 || error.response.status === 401){
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
}


//메인 베스트 후기로 등록하는 api
export const setAdminBestMainReview = async (reviewId: number, navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/reviews/main?reviewId=${reviewId}`,{},
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ setAdminBestMainReview ]",response.status);
      return response.status;
   } catch (error: any) {
      console.error(error);
      if(error.response.status === 403 || error.response.status === 401){
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
}