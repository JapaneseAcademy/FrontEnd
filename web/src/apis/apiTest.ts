import axios from 'axios';

export const getTest = async () => {
   return await axios.get('https://jpacademy.r-e.kr/api/v1/test/cors');
   }

export const postTest = async () => {
   try{
      const response = await axios.post('https://jpacademy.r-e.kr/api/v1/test/cors?message=hello', {

      });
      console.log(response);
   } catch (error) {
      console.error(error);
   }
}