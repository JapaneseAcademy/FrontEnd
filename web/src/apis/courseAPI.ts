import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getCourses = async () => {
   console.log("[ getCourses ]");
   try{
      const response = await axios.get(`${BASE_URL}/api/v1/courses`);
      console.log(response.data);
      return response.data;
   }
   catch(error){
      console.error(error);
   }
}

export const getCourseDetail = async (courseId: string) => {
   console.log("[ getCourseDetail ]");
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/courses/${courseId}`);
      console.log(response.data);
      return response.data;
   }
   catch (error){
      console.error(error);
   }
}

export const postCourse = async () => {
   try {
      const response = await axios.post(
         `${BASE_URL}/api/v1/courses`,
         {
            "title" : "프론트에서 postCourse test",
            "cost" : 180000,
            "startDate" : "2024-11-11",
            "endDate" : "2024-12-22",
            "descriptions" : ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png"],
            "tags" : ["new", "동영상"],
            "timetables" : [
               {
                  "weekday" : "MONDAY",
                  "startTime" : "14:00",
                  "endTime" : "15:00"
               },
               {
                  "weekday" : "WEDNESDAY",
                  "startTime" : "14:00",
                  "endTime" : "15:00"
               }
         ]
      },
      {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
      });

      console.log(response.data);
   }
   catch(error) {
      console.error(error);
   }
}