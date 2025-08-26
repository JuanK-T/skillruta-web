import CourseCard from '../CourseCard';
import { useCourses } from '../../../hooks/useCourses';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

interface CoursesGridSectionProps {
  onTotalChange?: (total: number) => void;
}

export default function CoursesGridSection({ onTotalChange }: CoursesGridSectionProps) {
  const { courses, total, loading, error } = useCourses();

  // Notificar el cambio en el total al componente padre
  useEffect(() => {
    if (onTotalChange && !loading) {
      onTotalChange(total);
    }
  }, [total, loading, onTotalChange]);

  if (loading) {
    return (
      <section id="cursos" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Cursos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestros cursos diseñados por expertos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white shadow ring-1 ring-black/5 overflow-hidden"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="cursos" className="py-20">
        <div className="container">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Error al cargar los cursos
            </h3>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-secondary px-4 py-2 text-sm"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cursos" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Cursos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestros cursos diseñados por expertos y comienza tu transformación profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Próximamente más cursos
            </h3>
            <p className="text-muted-foreground">Estamos preparando nuevos contenidos para ti</p>
          </div>
        )}
      </div>
    </section>
  );
}
