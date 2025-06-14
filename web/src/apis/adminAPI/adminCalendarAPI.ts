import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCalendar = async () => {
   // //토큰 없으면 리턴
   // if (!localStorage.getItem("accessToken")) {
   //    alert("로그인 후 이용해주세요.");
   //    return;
   // }

   try {
      const response = await axios.get(`${BASE_URL}/api/v1/main/calendar`);
      return response.data.calendar;
   }
   catch (error) {
      console.error(error);
   }
};

//캘린더 이미지 변경
export const changeAdminCalendar = async (calendar: File) => {
   const formData = new FormData();
   formData.append("calendar", calendar);

   try {
      await axios.put(`${BASE_URL}/api/v1/main/calendar`, formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      alert("캘린더 이미지가 변경되었습니다.");
      // window.location.reload();
   }
   catch (error) {
      alert("캘린더 이미지 변경에 실패했습니다.");
      console.error(error);
   }
}