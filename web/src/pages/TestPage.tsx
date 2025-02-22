import { postTest } from "../apis/apiTest";
import { getCourses } from "../apis/courseAPI";
import { getKakaoCode, register } from "../apis/loginAPI";

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
      </>
   );
};

export default TestPage;
