import { atom } from "recoil";

// 전역 로딩 상태 관리
export const loadingAtom = atom<boolean>({
  key: "loadingAtom", // 유니크한 key
  default: false, // 초기 상태: 로딩 중이 아님
});
