import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminStudents = async (navigate: (path: string) => void) => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/students`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         }
      );
      console.log("[ getAdminStudents ]", response.data);
      return response.data;
   }
   catch (error: any) {
      console.log(error);
      // 관리자가 아닐 경우: error.status === 403 || error.status === 401
      if (error.status === 403 || error.status === 401) {
         alert("관리자 로그인을 해주세요.");
         navigate('/admin/login');
      }
   }
}