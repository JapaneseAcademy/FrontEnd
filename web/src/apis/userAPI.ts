import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserInfo = async () => {
   //토큰 없으면 로그인해야 한다고 알려주기
   if (!localStorage.getItem('accessToken')) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
   console.log("[ getUserInfo ]");
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/members/profile`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      }
      );
      console.log(res.data);
      return res.data;
   } catch (error) {
      console.error(error);
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
};

export const getEnrollments = async () => {
   //토큰없으면 로그인해야 한다고 알려주기
   if (!localStorage.getItem('accessToken')) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
   console.log("[ getEnrollments ]");
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/enrollments`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      }
      );
      console.log(res.data);
      return res.data;
   } catch (error) {
      console.error(error);
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
}