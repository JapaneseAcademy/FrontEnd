import { getMonthlyCourses } from "../apis/adminAPI";
import { postTest } from "../apis/apiTest";
import { getCourses } from "../apis/courseAPI";
import { getKakaoCode } from "../apis/loginAPI";

const TestPage = () => {

   const handlePostClick = async () => {
      await postTest();
   };

   const handleLoginClick = async () => {
      const response = await getKakaoCode();
      console.log(response);
   };

   return (
      <>
         <button onClick={handlePostClick}>postTest</button>

         <button onClick={handleLoginClick}>login</button>

         <button onClick={() => getCourses()}>getCourses</button>
         
         <button onClick={() => getMonthlyCourses("2025-03-01")}>getMonthlyCourses</button>
      </>
   );
};

export default TestPage;
