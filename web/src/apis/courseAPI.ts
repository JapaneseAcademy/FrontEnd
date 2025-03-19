import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getCourseInfos = async () => {
   try{
      const response = await axios.get(`${BASE_URL}/api/v1/courses`);
      return response.data;
   }
   catch(error){
      console.error(error);
   }
}

export const getCourseDetail = async (courseId: number) => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/${courseId}`);
      return response.data;
   }
   catch (error){
      console.error(error);
   }
}
