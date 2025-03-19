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

// 특이사항 수정하는 api
export const updateStudentNote = async (studentId: number, note: string) => {
   try {
      const response = await axios.put(`${BASE_URL}/api/v1/admin/members/${studentId}`, {
         note
      }, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      alert("특이사항이 수정되었습니다.");
      // window.location.reload();
      return response.data;
   } catch (error: any) {
      alert("특이사항 수정에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
   }
}