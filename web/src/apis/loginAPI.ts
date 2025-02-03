import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = 'http://localhost:5173';
const KAKAO_LOGIN_URL = `${import.meta.env.VITE_KAKAO_AUTH_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getKakaoCode = () => {
   window.location.href = KAKAO_LOGIN_URL;
}

export const login = async (code: string) => {
   console.log("-- 로그인 함수 호출 --");

try {
      // 카카오에서 받은 토큰으로 로그인
      const response = await axios.post(
         `${BASE_URL}/api/v1/auth/kakao`,
         {
            authorizationCode: code,
         },
      );

      console.log(response.data);

      // 로그인 성공 시 토큰 저장
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("refreshToken", response.data.token.refreshToken);
   }
   catch (error) {
     //에러 설명 출력
      if (axios.isAxiosError(error)) {
         // AxiosError 타입인 경우에만 response를 안전하게 접근
         console.log(error);
         console.log(error.response?.data);
      } else {
            // AxiosError가 아닌 다른 에러 처리
            console.error("Unexpected error:", error);
      }
   }
}


export const register = async (kakaoID: string) => {
   console.log("-- 회원가입 함수 호출 --");

   try {
      const response = await axios.post(
         `${BASE_URL}/api/v1/auth/members`,
         {
            loginId : kakaoID, // 임시 값
            name : "수쨩테스트",
            phone : "01012345678",
            birth : "2000-11-30"
         },
      );
      console.log(response.data);
   }
   catch (error) {
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data);
      } else {
         console.error("Unexpected error:", error);
      }
   }
}