import { useEffect, useRef } from "react";

interface Marker {
   latitude: number; // 마커 위치 위도
   longitude: number; // 마커 위치 경도
   title?: string; // 마커에 표시할 타이틀 (선택)
}

interface KakaoMapProps {
   latitude: number; // 중심 좌표 위도
   longitude: number; // 중심 좌표 경도
   level?: number; // 지도 확대 레벨 (기본값: 3)
   style?: React.CSSProperties; // 지도 스타일 (CSS)
   markers?: Marker[]; // 표시할 마커 배열
}

const KakaoMap = ({ latitude, longitude, level = 3, style, markers = [] }: KakaoMapProps) => {
   const mapRef = useRef<HTMLDivElement | null>(null); // 맵 컨테이너 참조

   // Kakao Maps 스크립트 로드 함수
   const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
         if (document.getElementById("kakao-map-script")) {
            resolve("Script already loaded");
            return;
         }

         const script = document.createElement("script");
         script.id = "kakao-map-script";
         script.type = "text/javascript";
         script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_JAVASCRIPT_APP_KEY}`;
         script.onload = () => resolve("Script loaded");
         script.onerror = () => reject("Failed to load script");
         document.head.appendChild(script);
      });
   };

   // 지도 초기화 함수
   const initMap = () => {
      if (mapRef.current && window.Kakao && window.Kakao.maps) {
         const options = {
            center: new window.Kakao.maps.LatLng(latitude, longitude),
            level,
         };
         const map = new window.Kakao.maps.Map(mapRef.current, options);

         // 마커 추가
         markers.forEach((marker) => {
            const markerPosition = new window.Kakao.maps.LatLng(marker.latitude, marker.longitude);
            const kakaoMarker = new window.Kakao.maps.Marker({
               position: markerPosition,
               title: marker.title,
            });
            kakaoMarker.setMap(map);
         });

         console.log("Map initialized with markers:", map, markers);
      } else {
         console.error("Kakao Maps API is not loaded or map container is missing.");
      }
   };

   useEffect(() => {
      loadKakaoMapScript()
         .then(() => {
            console.log("Kakao Maps script loaded");
            initMap(); // 스크립트 로드 후 지도 초기화
         })
         .catch((error) => console.error(error));
   }, [latitude, longitude, level, markers]); // 의존성 배열에 markers 추가

   return (
      <div
         id="map"
         ref={mapRef}
         style={{
            width: "100%",
            height: "100%",
            ...style,
         }}
      ></div>
   );
};

export default KakaoMap;
