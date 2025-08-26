import { useState, useEffect, useCallback } from 'react';
import { CourseDetail } from '../types/chapter';
import { coursesApi } from '../api/coursesApi';

export const useCourse = (slug: string) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const courseData = await coursesApi.getCourseBySlug(slug);
      setCourse(courseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]); // slug como dependencia

  useEffect(() => {
    if (slug) {
      fetchCourse();
    }
  }, [slug, fetchCourse]); // Ahora incluye fetchCourse

  return {
    course,
    loading,
    error,
    refetch: fetchCourse,
  };
};