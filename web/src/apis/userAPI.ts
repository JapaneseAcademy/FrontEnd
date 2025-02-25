import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserInfo = async () => {
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
   }
};