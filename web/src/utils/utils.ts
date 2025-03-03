//boolean 값으로오는 isLive, isOnline, isRecorded 필드를 tags[] 형태로 변경(true면 Live, Online, Recorded 추가하기)
export const convertTags = (live: boolean, online: boolean, recorded: boolean) => {
   const tags = [];
   if (live) tags.push("현장강의");
   if (online) tags.push("온라인");
   if (recorded) tags.push("동영상");
   return tags;
};

//1000단위 콤마 추가
export const numberWithCommas = (x: number) => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}