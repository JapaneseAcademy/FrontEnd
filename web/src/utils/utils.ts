//boolean 값으로오는 isLive, isOnline, isRecorded 필드를 tags[] 형태로 변경(true면 Live, Online, Recorded 추가하기)
export const convertTags = (isLive: boolean, isOnline: boolean, isRecorded: boolean) => {
   const tags = [];
   if (isLive) tags.push("온라인");
   if (isOnline) tags.push("동영상");
   if (isRecorded) tags.push("현장강의");
   return tags;
};