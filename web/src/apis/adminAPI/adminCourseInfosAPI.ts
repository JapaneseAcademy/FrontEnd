import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// courseInfos 불러오는 api
export const getAdminCourseInfos = async (navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/courseInfos`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ getCouresInfos ]",response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
      // 관리자가 아닐 경우: error.status === 403 || error.status === 401
      if (error.status === 403 || error.status === 401) {
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
};