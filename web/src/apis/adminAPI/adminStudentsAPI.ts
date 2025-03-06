import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAdminStudents = async () => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/students`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         }
      );
      console.log("[ getAdminStudents ]", response.data);
      return response.data;
   }
   catch (error) {
      console.log(error);
   }
}