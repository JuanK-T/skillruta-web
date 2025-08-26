import { Link } from 'react-router-dom';
import type { Course } from '../types/types';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={course.thumbnailUrl} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{course.title}</h3>
          <span className="text-[10px] px-2 py-1 bg-primary rounded-full text-neutral">
            {course.category}
          </span>
        </div>
        <div className="text-xs opacity-70">Autor: {course.authorName}</div>
        <div className="flex items-center justify-between">
          <Link
            to={`/courses/${course.slug}`}
            className="rounded-xl bg-secondary px-3 py-1.5 text-sm"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
