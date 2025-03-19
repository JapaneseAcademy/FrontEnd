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
      return response.data;
   } catch (error: any) {
      console.error(error);
   }
}

// 관리자가 직접 강의에 멤버를 등록하는 api
export const addStudentToCourse = async (timeTableId: number, memberId: number, category: string, paymentAmount: number, method: string, paymentDate: string) => {
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/enrollments`, {
         timeTableId,
         memberId,
         category,
         paymentAmount,
         paymentDate,
         method
      }, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      alert("수강생이 등록되었습니다.");
      window.location.reload();
      return response.data;
   } catch (error: any) {
      console.error(error);
      //이미 수강신청한 경우
      if (error.response.data.errorCode == "DUPLICATE_ENROLLMENT_ERROR") {         
         alert("이미 등록된 수강생입니다.");
      } else {
         alert("수강생 등록에 실패했습니다. 다시 시도해주세요.");
      }
   }
}


type TimeBlock = {
   weekday: string;
   startTime: string;
   endTime: string;
}
// 분반 생성하는 api
export const createTimetable = async (courseInfoId: number, date: string, timeBlocks: TimeBlock[]) => {
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/courses`, {
         courseInfoId,
         date,
         timeBlocks
      }, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log(response.data);
      alert("분반이 생성되었습니다.");
      window.location.reload();
      return true;
   } catch (error: any) {
      console.error(error);
      alert("분반 생성에 실패했습니다. 다시 시도해주세요.");
      return false;
   }
}

// 분반 삭제하는 api
export const deleteTimetable = async (timeTableId: number) => {
   try {
      const response = await axios.delete(`${BASE_URL}/api/v1/time-tables/${timeTableId}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      alert("분반이 삭제되었습니다.");
      window.location.reload();
      return response.data;
   } catch (error: any) {
      console.error(error);
      alert("분반 삭제에 실패했습니다. 다시 시도해주세요.");
   }
}