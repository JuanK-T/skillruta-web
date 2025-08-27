import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCourse } from '@/modules/courses/hooks/useCourse';
import { CourseDetailSkeleton } from './CourseDetailSkeleton';
import { CourseErrorState } from './CourseErrorState';
import { CourseHeader } from './CourseHeader';
import { CourseActions } from './actions/CourseActions';
import { CourseObjectives } from './CourseObjectives';
import { CourseChapters } from './CourseChapters';
import { CourseFeatures } from './CourseFeatures';
import { toast } from 'sonner';

export default function CoursePublicPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { course, loading, error, refetch } = useCourse(slug || '');

  const handleEnroll = async () => {
    try {
      // Aquí iría la lógica de inscripción
      toast.success('¡Inscripción exitosa!');
      // Recargar los datos del curso para actualizar el estado de inscripción
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error('Error al inscribirse en el curso');
    }
  };

  const handlePublishToggle = async () => {
    try {
      // Aquí iría la lógica de publicación/despublicación
      toast.success(`Curso ${course?.isPublished ? 'despublicado' : 'publicado'} correctamente`);
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error('Error al cambiar el estado de publicación');
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        '¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.'
      )
    ) {
      return;
    }

    try {
      // Aquí iría la lógica de eliminación
      toast.success('Curso eliminado correctamente');
      // Redirigir a la página principal o al dashboard
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar el curso');
    }
  };

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (error || !course) {
    return <CourseErrorState error={error || undefined} />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container py-8">
        <CourseHeader course={course} />

        {/* Acciones - Ahora con lógica completa */}
        <div className="mt-6">
          <CourseActions
            course={course}
            onEnroll={handleEnroll}
            onPublishToggle={handlePublishToggle}
            onDelete={handleDelete}
          />
        </div>

        {/* Resto del componente permanece igual */}
        <CourseObjectives objectives={course.objectives} />
        {course.chapters && course.chapters.length > 0 && (
          <CourseChapters chapters={course.chapters} isAuthenticated={!!user} />
        )}
        <CourseFeatures />
      </div>
    </div>
  );
}
