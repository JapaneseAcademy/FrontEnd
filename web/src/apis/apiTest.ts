import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postTest = async () => {
   try{
      const response = await axios.post(`${BASE_URL}/`, {

      });
      console.log(response);
   } catch (error) {
      console.error(error);
   }
}

