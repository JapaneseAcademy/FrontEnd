import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//년/월로 해당하는 timeTable 불러오는 api
export const getAdminCoursesByMonth = async (date: string | '2025-04', navigate: (path: string) => void) => {
   //토큰 없으면 로그인 페이지로 이동
   if (!localStorage.getItem("accessToken")) {
      alert("관리자 로그인이 필요합니다.");
      navigate('/admin/login');
      return;
   }
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
         alert("관리자 로그인이 필요합니다.");
         navigate('/admin/login');
      }
   }
}

//해당 timetable을 수강 중인 학생들 목록 조회하는 api
export const getStudentsByTimetableId = async (timetableId: number) => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/courses/students?timeTableId=${timetableId}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ getStudentsByTimetableId ]", response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
   }
}

// 관리자가 직접 강의에 멤버를 등록하는 api
export const addStudentToCourse = async (timeTableId: number, memberId: number, category: string, paymentAmount: number, paymentDate: string) => {
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/enrollments`, {
         timeTableId,
         memberId,
         category,
         paymentAmount,
         paymentDate,
      }, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ addStudentToCourse ]", response.data);
      return response.data;
   } catch (error: any) {
      console.error(error);
      alert("수강생 등록에 실패했습니다. 다시 시도해주세요.")
   }
}