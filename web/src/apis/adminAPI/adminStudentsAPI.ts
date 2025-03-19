import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminStudents = async () => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      window.location.href = '/admin/login';
      return;
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/students`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         }
      );
      return response.data;
   }
   catch (error: any) {
      console.log(error);
      // 관리자가 아닐 경우: error.status === 403 || error.status === 401
      if (error.status === 403 || error.status === 401) {
         alert("관리자 로그인이 필요합니다.");
         window.location.href = '/admin/login';
      }
   }
}