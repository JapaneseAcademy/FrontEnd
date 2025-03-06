import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
// 현재 환경에 따라 동적으로 redirect_uri를 설정
const REDIRECT_URI = `${window.location.origin}`;
const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getKakaoCode = () => {
   window.location.href = KAKAO_LOGIN_URL;
}

export const login = async (code: string, navigate: (path: string) => void, setIsLoading: (loading: boolean) => void) => {
   console.log("[ login ]");
   setIsLoading(true); // ✅ 로딩 시작
   try {
      // 카카오에서 받은 토큰으로 로그인
      const response = await axios.post(
         `${BASE_URL}/api/v1/auth/kakao`,
         {
            authorizationCode: code,
         },
      );

      console.log(response.data);
      const kakaoID = response.data.loginId;

      //1. 첫 로그인일시 회원가입 페이지로 redirect
      if (response.data.requiresSignUp) {
         console.log("첫로그인!!!");
         navigate("/register?kakaoID=" + kakaoID);
      }
      //2. 기존 회원일 경우 토큰 저장
      else {
         localStorage.setItem("accessToken", response.data.token.accessToken);
         localStorage.setItem("refreshToken", response.data.token.refreshToken);
         window.history.replaceState({}, document.title, "/"); //url에서 code 제거
      }
   }
   catch (error) {
     //에러 설명 출력
      if (axios.isAxiosError(error)) {
         // AxiosError 타입인 경우에만 response를 안전하게 접근
         console.log(error);
         console.log(`login error: ${error.response?.data}`);
      } else {
            // AxiosError가 아닌 다른 에러 처리
            console.error("Unexpected error:", error);
      }
   }
      finally {
         setIsLoading(false); // ✅ 로딩 종료
   }
}


export const register = async (name: string, phone: string, birth: string, setIsLoading: (loading: boolean) => void) => {
   console.log("[ register ]");
   setIsLoading(true); // ✅ 로딩 시작
   //쿼리 파라미터에서 kakaoID 받아오기
   const kakaoId = new URLSearchParams(window.location.search).get("kakaoID");

   try {
      const response = await axios.post(
         `${BASE_URL}/api/v1/auth/members`,
         {
            loginId : kakaoId,
            name : name,
            phone : phone,
            birth : birth
         },
      );
      console.log(response.data);

      //토큰 저장
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("refreshToken", response.data.token.refreshToken);

      alert("회원가입이 완료되었습니다!");

      //메인페이지로 이동
      window.location.href = "/";
   }
   catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data);
      } else {
         console.error("Unexpected error:", error);
      }
   }
   finally {
      setIsLoading(false); // ✅ 로딩 종료
   }
}

export const editUser = async (name: string, phone: string, birth: string) => {
   console.log("-- editUser 함수 호출 --");
   try {
      const response = await axios.patch(
         `${BASE_URL}/api/v1/members/profile`,
         {
            name : name,
            phone : phone,
            birth : birth
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
         }
      );
      console.log(response.data);
      alert("회원 정보 수정이 완료되었습니다.");
      window.location.href = "/mypage";
   }
   catch (error) {
      alert("회원 정보 수정에 실패했습니다. 다시 시도해주세요.");
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data);
      } else {
         console.error("Unexpected error:", error);
      }
   }
}