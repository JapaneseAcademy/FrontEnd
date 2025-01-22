import axios from "axios";

const REDIRECT_URI = "http://localhost:5173";
const REST_API_KEY = "9418bc955573195b97f867ebaba95fbb";
const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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