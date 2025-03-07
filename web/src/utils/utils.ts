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

//영어 요일을 한글 요일로 바꾸는 함수
export const convertWeekday = (weekday: string) => {
   switch (weekday) {
      case "MONDAY":
         return "월";
      case "TUESDAY":
         return "화";
      case "WEDNESDAY":
         return "수";
      case "THURSDAY":
         return "목";
      case "FRIDAY":
         return "금";
      case "SATURDAY":
         return "토";
      case "SUNDAY":
         return "일";
      default:
         return "";
   }
}

//시,분,초까지 있는 시간을 시,분까지만 표시하는 함수
export const convertTime = (time: string) => {
   return time.slice(0, 5);
}

//강의 유형 한글로 바꾸는 함수
export const convertCategory = (category: string) => {
   switch (category) {
      case "LIVE":
         return "현장강의";
      case "ONLINE":
         return "온라인";
      case "RECORDED":
         return "동영상";
      default:
         return "";
   }
}
