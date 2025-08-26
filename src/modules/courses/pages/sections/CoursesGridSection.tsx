import CourseCard from '@/modules/courses/components/CourseCard';
import type { Course } from '@/modules/courses/types/types';

type Props = { courses: Course[] };

export default function CoursesGridSection({ courses }: Props) {
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
