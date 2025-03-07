import { atom } from "recoil";

// 관리자 로그인 상태 관리
export const adminLoginAtom = atom<boolean>({
   key: "adminLoginAtom", // 유니크한 key
   default: false, // 초기 상태: 로그인 중이 아님
});