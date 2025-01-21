import { useEffect, useRef } from "react";
import { getTest, postTest } from "../apis/apiTest";

const TestPage = () => {
   const mapRef = useRef<HTMLDivElement | null>(null); // 맵 컨테이너 참조

   // 지도 초기화 함수
   const initMap = () => {
      if (mapRef.current && window.kakao && window.kakao.maps) {
         const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
         };
         const map = new window.kakao.maps.Map(mapRef.current, options);
         console.log("Map initialized:", map);
      } else {
         console.error("Kakao Maps API is not loaded or map container is missing.");
      }
   };

   useEffect(() => {
      // Kakao Maps API가 로드된 후 initMap 실행
      if (window.kakao && window.kakao.maps) {
         initMap();
      } else {
         console.error("Kakao Maps API is not loaded yet.");
      }
   }, []);

   const handleGetClick = async () => {
      const response = await getTest();
      console.log(response);
   };

   const handlePostClick = async () => {
      await postTest();
   };

   return (
      <>
         <button onClick={handleGetClick}>getTest</button>
         <button onClick={handlePostClick}>postTest</button>
         {/* 맵 컨테이너 */}
         <div id="map" ref={mapRef} style={{ width: "500px", height: "400px" }}></div>
      </>
   );
};

export default TestPage;
