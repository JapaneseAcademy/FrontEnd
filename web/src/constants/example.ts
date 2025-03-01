export const REVIEWS_DATA = Array.from({ length: 100 }, (_, i) => ({
   reviewId: i + 1,
   name: "김예리",
   courseTitle: `원샷반${(i % 5) + 1}`,
   reviewTitle: "세계 최고의 일본어 강의!!!",
   reviewText:
      i % 2 === 0
         ? "강의가 너무 좋아요! 선생님도 친절하시고, 수업도 재미있어요. 다음 수업도 기대됩니다."
         : "수업이 정말 체계적으로 진행돼서 좋았어요! 초보자도 쉽게 따라갈 수 있는 강의입니다.",
   date: `2021-09-${(i % 30) + 1}`.padStart(10, "0"),
 }));
 