import { useState, useEffect, useCallback } from 'react';
import { CourseDetail, UpdateCourseData } from '../types';
import { coursesApi } from '../api/coursesApi';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useCourse = (slug: string) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();

  const fetchCourse = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const courseData = await coursesApi.getCourseBySlug(slug);

      // Verificar si el usuario actual es el dueño
      const isOwner = user?.id === courseData.authorId;

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

  const updateCourse = async (data: UpdateCourseData) => {
    if (!course) return;

    try {
      setIsUpdating(true);
      // Implementar actualización usando coursesApi.updateCourse
      await coursesApi.updateCourse(course.id, data);

      // Actualizar estado local
      setCourse((prev) => (prev ? { ...prev, ...data } : null));
      toast.success('Curso actualizado exitosamente');
    } catch (err) {
      toast.error('Error al actualizar el curso');
      console.error('Error updating course:', err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  const publishCourse = async () => {
    if (!course) return;

    try {
      await coursesApi.publishCourse(course.id);
      setCourse((prev) => (prev ? { ...prev, isPublished: true } : null));
      toast.success('Curso publicado exitosamente');
    } catch (err) {
      toast.error('Error al publicar el curso');
      console.error('Error publishing course:', err);
    }
  };

  const unpublishCourse = async () => {
    if (!course) return;

    try {
      await coursesApi.unpublishCourse(course.id);
      setCourse((prev) => (prev ? { ...prev, isPublished: false } : null));
      toast.success('Curso despublicado exitosamente');
    } catch (err) {
      toast.error('Error al despublicar el curso');
      console.error('Error unpublishing course:', err);
    }
  };

  return {
    course,
    loading,
    error,
    isUpdating,
    updateCourse,
    publishCourse,
    unpublishCourse,
    refetch: fetchCourse,
  };
};
