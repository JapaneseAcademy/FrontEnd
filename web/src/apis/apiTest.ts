import axios from 'axios';

export const getTest = async () => {
   return await axios.get('http://jpacademy.r-e.kr:8080/api/v1/test/cors');
   }

export const postTest = async () => {
   try{
      const response = await axios.post('http://jpacademy.r-e.kr:8080/api/v1/test/cors?message=hello', {

      });
      console.log(response);
   } catch (error) {
      console.error(error);
   }
}