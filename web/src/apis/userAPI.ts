import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserInfo = async () => {
   //토큰 없으면 로그인해야 한다고 알려주기
   if (!localStorage.getItem('accessToken')) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
   }
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/members/profile`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      }
      );
      return res.data;
   } catch (error) {
      console.error(error);

   }
};

export const getEnrollments = async () => {
   //토큰없으면 로그인해야 한다고 알려주기
   // if (!localStorage.getItem('accessToken')) {
   //    alert("로그인이 필요합니다.");
   //    window.location.href = "/";
   // }
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/enrollments`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      }
      );
      console.log(res.data);
      return res.data;
   } catch (error) {
      console.error(error);
      // alert("로그인이 필요합니다.");
      // window.location.href = "/";
   }
}

//내가 쓴 후기 가져오는 api
export const getMyReviews = async () => {
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/members/me/reviews`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }  
      });
      console.log("[getMyReviews]: ", res.data);
      return res.data;
   } catch (error) {
      console.error(error);
      // alert("로그인이 필요합니다.");
      // window.location.href = "/";
   }
}

//내가 쓴 후기 삭제하는 api
export const deleteMyReview = async (reviewId: number) => {
   try {
      const res = await axios.delete(`${BASE_URL}/api/v1/reviews/${reviewId}`,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      });
      console.log(res.data);
      alert("후기가 삭제되었습니다.");
      window.location.reload();
      return res.data;
   } catch (error) {
      console.error(error);
      alert("후기 삭제에 실패했습니다. 다시 시도해주세요.");
   }
}