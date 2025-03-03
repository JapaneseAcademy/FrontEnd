import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


//관리자인지 검증하는 API
export const checkAdmin = async () => {
   //{todo: localstorage에 토큰이 있으면, 그 토큰을 백으로 보내서 관리자 토큰인지 확인.}
}

//월별로 필터링해서 강의 가져오는 api
export const getMonthlyCourses = async (date: string | '2025-03-01') => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses?date=${date}`);
      console.log("[ getMonthlyCourses ]", response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}