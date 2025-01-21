/* eslint-disable @typescript-eslint/no-explicit-any */ // any 타입 사용을 허용합니다.
import { MutableRefObject, useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  const mapRef = useRef<HTMLElement | null>(null);

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.483034, 126.902435),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, options);

    // mapRef에 현재 지도 객체 저장
    (mapRef as MutableRefObject<any>).current = map;
  };

  useEffect(() => {
    const kakaoMapsScript = document.createElement('script');
    kakaoMapsScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_VITE_KAKAOMAP_JAVASCRIPT_APP_KEY%&autoload=false`;
    kakaoMapsScript.async = true;
    document.head.appendChild(kakaoMapsScript);
  
    kakaoMapsScript.onload = () => {
      console.log('카카오 맵 스크립트 로드 성공');
      window.kakao.maps.load(() => {
        console.log('카카오 맵 초기화 가능');
        initMap();
      });
    };
  
    kakaoMapsScript.onerror = () => {
      console.error('카카오 맵 스크립트 로드 실패');
    };
  }, []);

  return <div id="map" style={{ width: '90%', height: '400px' }}></div>;
}

export default Map;
