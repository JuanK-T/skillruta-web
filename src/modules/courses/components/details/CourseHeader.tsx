import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { CourseDetail } from '@/modules/courses/types/chapter'; // Cambia a CourseDetail
import { getCategoryStyle, formatCategoryText } from '@/modules/courses/utils/categoryColors';

interface CourseHeaderProps {
  course: CourseDetail; // Cambia a CourseDetail
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const categoryStyle = getCategoryStyle(course.category);
  const formattedCategory = formatCategoryText(course.category);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

  // Añade tipos explícitos para reduce
  const totalDuration = course.chapters.reduce(
    (total: number, chapter) => total + chapter.durationSec,
    0
  );

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm"
        >
          <span className="mr-2">←</span>
          Volver a todos los cursos
        </Link>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen del curso */}
        <div className="rounded-2xl bg-card overflow-hidden shadow-lg">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        {/* Información del curso */}
        <div className="space-y-6">
          <div>
            <Badge
              variant="secondary"
              className="mb-3"
              style={{
                backgroundColor: categoryStyle.bgColor.replace('bg-', ''),
                color: categoryStyle.textColor.replace('text-', ''),
              }}
            >
              {formattedCategory}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Por {course.authorName}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDuration(totalDuration)}
              </div>
              <div className="flex items-center gap-1">
                {course.chapters.length} capítulo{course.chapters.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
