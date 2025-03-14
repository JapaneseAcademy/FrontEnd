import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//현재 유튜브 영상 id 조회하는 api
export const getAdminYoutubeId = async () => {
      //토큰 없으면 로그인해야 한다고 알려주기
      if (!localStorage.getItem('accessToken')) {
         alert("관리자 로그인이 필요합니다.");
         window.location.href = "/";
      }
   try {
      const response = await axios.get(`${BASE_URL}/api/v1/main/youtube`);
      console.log("[getAdminYoutubeId] ", response.data);
      return response.data;
   }
   catch (error) {
      console.error(error);
      alert('유튜브 영상 조회에 실패했습니다. 다시 시도해주세요.');
   }
}

// 유튜브 영상 id 변경하는 api
export const changeAdminYoutubeId = async (youtubeId: string) => {
   try {
      const response = await axios.put(`${BASE_URL}/api/v1/main/youtube`, 
         { youtubeId },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
         }

      );
      console.log("[changeAdminYoutubeId] ", response.data);
      //status code 200이면 성공
      if(response.status === 200) {
         alert('유튜브 영상이 변경되었습니다.');
      }
   }
   catch (error) {
      console.error(error);
      alert('유튜브 영상 변경에 실패했습니다. 다시 시도해주세요.');
   }
}

