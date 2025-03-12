import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// 관리자 메시지 전송 api
export const sendAdminMessage = async (message: string, receiverIds: number[]) => {
   //토큰 없으면 리턴
   if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용해주세요.");
      return;
   }
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/message`, {
         message,
         receiverIds,
         testMode: "N"
      },
      {
         headers: 
         {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[sendAdminMessage] ", response.data);
      alert("메시지 전송이 완료되었습니다.");
      return response.data;
   } catch (error) {
      console.log(error);
      alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
   }
}

// 메시지 페이지에서, 년월별 분반들과 수강생들 불러오는 api
export const getTimeTableandStudentsForMessage = async (year: string, month: string) => {
   //토큰 없으면 리턴
   if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용해주세요.");
      return;
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/time-tables?date=${year}-${month}`, {
         headers: 
         {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[getTimeTableandStudentsForMessage] ", response.data);
      return response.data;
   } catch (error) {
      console.log(error);
      alert("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
   }
}