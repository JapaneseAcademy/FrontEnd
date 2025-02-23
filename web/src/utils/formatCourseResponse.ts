export const formatCourseResponse = (data: any) => {
   return data.map((course: any) => ({
      courseId: course.id,
      courseTitle: course.title,
      courseCost: course.cost,
      courseStartDate: course.startDate,
      courseEndDate: course.endDate,
      courseImages: course.descriptions,
      courseTags: course.tags,
      courseTimetables: course.timeTables
   }));
};