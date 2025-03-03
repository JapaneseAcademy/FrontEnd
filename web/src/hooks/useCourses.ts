import { useState, useEffect } from 'react';
import { getCourseInfos } from '../apis/courseAPI';

const useCourses = () => {
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
         const data = await getCourseInfos();
         setCourses(data);
         } catch (err) {
         setError(err as Error);
         } finally {
         setLoading(false);
         }
      };

      fetchData();
   }, []);

   return { courses, loading, error };
};

export default useCourses;
