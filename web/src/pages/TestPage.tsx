import { getTest, postTest } from "../apis/apiTest";
import { getKakaoCode, register } from "../apis/loginAPI";
import KakaoMap from "../components/KakaoMap";

const TestPage = () => {
   const handleGetClick = async () => {
      const response = await getTest();
      console.log(response);
   };

   const handlePostClick = async () => {
      await postTest();
   };

   const handleLoginClick = async () => {
      const response = await getKakaoCode();
      console.log(response);
   };

   return (
      <>
         <button onClick={handleGetClick}>getTest</button>
         <button onClick={handlePostClick}>postTest</button>

         {/* Kakao Map 컴포넌트 사용 */}
         <KakaoMap
            latitude={37.563887} // 위도
            longitude={126.993645}  // 경도
            level={3}
            style={{ width: "100%", height: "400px" }}
         />

         <button onClick={handleLoginClick}>login</button>
         <button onClick={() => register("kakao_3889727808")}>register</button>
      </>
   );
};

export default TestPage;
