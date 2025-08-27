import { useState, useEffect, useCallback } from 'react';
import { CourseDetail } from '../types';
import { coursesApi } from '../api/coursesApi';
import { useAuth } from '@/hooks/useAuth';

export const useCourse = (slug: string) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCourse = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const courseData = await coursesApi.getCourseBySlug(slug);

      // Verificar si el usuario actual es el dueño
      const isOwner = user?.id === courseData.authorId;

      // Aquí podrías también verificar si el usuario está inscrito
      // const isEnrolled = await checkEnrollment(courseData.id);

      setCourse({
        ...courseData,
        isOwner,
        isEnrolled: false, // Por ahora hardcodeado, luego implementar
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  }, [slug, user?.id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    course,
    loading,
    error,
    refetch: fetchCourse,
  };
};
