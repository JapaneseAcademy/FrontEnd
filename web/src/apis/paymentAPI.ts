import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const paymentAPI = async (paymentKey: string) => {
   try {
      const response = await axios.post(`${BASE_URL}/payment/toss/${paymentKey}`, 
         {
            orderId: "order-1234",
            amount: 10000,
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
         }
      );
      console.log(response);
   }
   catch (error) {
      console.error(error);
   }
};