import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//백에서 orderId 발급받는 api
export const getOrderId = async (timeTableId: number) => {
   //토큰 없으면 로그인해야 한다고 알려주기
   if (!localStorage.getItem('accessToken')) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/payments/toss?timeTableId=${timeTableId}`, 
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
         }
      );
      return response.data.orderId;
   }
   catch (error) {
      console.error(error);
      alert("결제 정보를 받아오는데 실패했습니다.");
      window.location.href = `/courses`;
   }
};

// 최종으로 수강신청하는 api
export const assignCourse = async (
   
   timeTableId: number,
   category: string | null,
   amount: number,
   paymentKey: string | null,
   orderId: string | null,

   courseInfoId: number
) => {
   try {
            //토큰 없으면 로그인해야 한다고 알려주기
      if (!localStorage.getItem('accessToken')) {
         alert("로그인이 필요합니다.");
         window.location.href = "/";
      }
      // 2. 실제로 결제 승인 요청을 보낸다.(수강신청을 한다.)
      const response = await axios.post(`${BASE_URL}/api/v1/enrollments`, 
         {
            timeTableId,
            category,
            amount,
            paymentKey,
            orderId
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
         }
      );
      return response.status; //TODO: 예외처ㅣㄹ
   }
   catch (error: any) {
      console.error(error);
      // 이미 있는 수강신청일 경우
      if (error.response.data.errorCode == "DUPLICATE_ENROLLMENT_ERROR") {
         alert("이미 수강신청한 강의입니다.");
         window.location.href = `/courses/${courseInfoId}`;
      }
      else {
         alert("수강신청에 실패했습니다. 다시 시도해주세요.");
         window.location.href = `/courses/${courseInfoId}`;
      }
   }
}
