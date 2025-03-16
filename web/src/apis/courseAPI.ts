import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getCourseInfos = async () => {
   console.log("[ getCourseInfos ]");
   try{
      const response = await axios.get(`${BASE_URL}/api/v1/courses`);
      console.log(response.data);
      return response.data;
   }
   catch(error){
      console.error(error);
   }
}

export const getCourseDetail = async (courseId: number) => {
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/${courseId}`);
      console.log("[ getCourseDetail ]", response.data);
      return response.data;
   }
   catch (error){
      console.error(error);
   }
}
