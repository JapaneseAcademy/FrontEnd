import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminCoursesByMonth = async (date: string | '2025-04') => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/courses?date=${date}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      });
      console.log("[ getAdminCoursesByMonth ]", response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
}