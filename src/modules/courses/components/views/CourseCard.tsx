import type { Course } from '../../types';
import { getCategoryStyle, formatCategoryText } from '../../utils/categoryColors';
import { useProtectedNavigation } from '@/hooks/useProtectedNavigation';

export default function CourseCard({ course }: { course: Course }) {
  const categoryStyle = getCategoryStyle(course.category);
  const formattedCategory = formatCategoryText(course.category);
  const { navigateToProtected } = useProtectedNavigation();

  const handleCourseClick = () => {
    navigateToProtected(`/courses/${course.slug}`);
  };

  return (
    <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={course.thumbnailUrl} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight line-clamp-2">{course.title}</h3>
          <span
            className={`text-[10px] px-2 py-1 rounded-full ${categoryStyle.bgColor} ${categoryStyle.textColor}`}
          >
            {formattedCategory}
          </span>
        </div>
        <div className="text-xs opacity-70">Autor: {course.authorName}</div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleCourseClick}
            className="rounded-xl bg-secondary px-3 py-1.5 text-sm hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}
