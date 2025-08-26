import { useState, useEffect } from 'react';
import { Course, CoursesResponse } from '../types/types';
import { coursesApi } from '../api/coursesApi';

interface UseCoursesResult {
  courses: Course[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCourses = (): UseCoursesResult => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: CoursesResponse = await coursesApi.getCourses({
        onlyPublished: true,
        pageSize: 100,
      });
      setCourses(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los cursos');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    total,
    loading,
    error,
    refetch: fetchCourses,
  };
};