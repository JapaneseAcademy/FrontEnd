import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


//관리자인지 검증하는 API
export const checkAdmin = async () => {
   try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/token`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         }
      );
      console.log("[ checkAdmin ]", response.data);
      return response.data;
   }
   catch (error) {
      console.error(error);
   }
}
