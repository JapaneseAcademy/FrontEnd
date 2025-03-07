import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminLogin = async (code: string, navigate: (path: string) => void, setIsLoading: (loading: boolean) => void) => {
   console.log("[ adminLogin ]");
   console.log("code: ", code);
   setIsLoading(true); // ✅ 로딩 시작
   try {
      // 카카오에서 받은 토큰으로 로그인
      const response = await axios.post(
         `${BASE_URL}/api/v1/auth/kakao/admin`,
         {
            authorizationCode: code,
         },
      );

      console.log(response.data);

      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("refreshToken", response.data.token.refreshToken);
      
      //role이 INSTRUCTOR 일 때만 true 반환
      if (response.data.role === "INSTRUCTOR") {
         alert("관리자로 로그인 되었습니다.");
         // setIsAdminLogin(true);
         navigate('/admin/student');
      }
      else {
         alert("관리자가 아닙니다.");
         // setIsAdminLogin(false);
         navigate('/admin/login');
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