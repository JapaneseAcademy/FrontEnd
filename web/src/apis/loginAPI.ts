import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const KAKAO_LOGIN_URL = `${import.meta.env.VITE_KAKAO_AUTH_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const getKakaoCode = () => {
   window.location.href = KAKAO_LOGIN_URL;
}

export const login = async (code: string) => {
   console.log("-- 로그인 함수 호출 --");

try {
      // 카카오에서 받은 토큰으로 로그인
      const response = await axios.post(
         'http://jpacademy.r-e.kr:8080/api/v1/auth/kakao',
         {
            authorizationCode: code,
         },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );

      console.log(response.data);
   }
   catch (error) {
      console.error(error);
   }
}