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
//한글 요일을 영어 요일로 바꾸는 함수
export const convertWeekdayToEng = (weekday: string) => {
   switch (weekday) {
      case "월":
         return "MONDAY";
      case "화":
         return "TUESDAY";
      case "수":
         return "WEDNESDAY";
      case "목":
         return "THURSDAY";
      case "금":
         return "FRIDAY";
      case "토":
         return "SATURDAY";
      case "일":
         return "SUNDAY";
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


//강의 유형을 영어로 다시 바꾸는 함수
export const convertCategoryToEng = (category: string|null) => {
   switch (category) {
      case "현장강의":
         return "LIVE";
      case "온라인":
         return "ONLINE";
      case "동영상":
         return "RECORDED";
      default:
         return "";
   }
}

// 시간 뒤에 00을 붙이는 함수
export const convertTimeToFull = (time: string) => {
   return time + ":00";
}

//2025-04-01 식으로 된 문자열을 넣으면, 월만 반환하는 함수(04면 문자열 4 반환, 12면 문자열 12 반환)
export const extractMonth = (date: string) => {
   //04처럼 앞에 0이 붙어있는 경우, 0을 제거
   if (date[5] === "0") {
      return date[6];
   }
   //10, 11, 12인 경우, 그대로 반환
   if (date[5] === "1") {
      return date.slice(5, 7);
   }
}