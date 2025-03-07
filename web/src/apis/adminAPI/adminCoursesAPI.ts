import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminCoursesByMonth = async (date: string | '2025-04', navigate: (path: string) => void) => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/courses?date=${date}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ getAdminCoursesByMonth ]", response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
      //관리자가 아닐 경우: error.status === 403 || error.status === 401
      if (error.status === 403 || error.status === 401) {
         alert("관리자 로그인을 해주세요.");
         console.log("관리자가 아닙니다.");
         navigate('/admin/login');
      }
   }
}