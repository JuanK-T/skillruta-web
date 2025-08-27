import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Edit, Eye, EyeOff, Trash2, BarChart3 } from 'lucide-react';

interface CourseOwnerActionsProps {
  courseId: string;
  courseSlug: string;
  isPublished: boolean;
  onPublishToggle: () => void;
  onDelete: () => void;
}

export function CourseOwnerActions({
  courseId,
  courseSlug,
  isPublished,
  onPublishToggle,
  onDelete,
}: CourseOwnerActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" variant="outline" asChild>
        <Link to={`/instructor/courses/${courseSlug}/edit`}>
          <Edit className="h-4 w-4 mr-2" />
          Editar curso
        </Link>
      </Button>

      <Button size="lg" variant="outline" asChild>
        <Link to={`/instructor/courses/${courseId}/analytics`}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Estadísticas
        </Link>
      </Button>

      <Button size="lg" variant={isPublished ? 'outline' : 'default'} onClick={onPublishToggle}>
        {isPublished ? (
          <>
            <EyeOff className="h-4 w-4 mr-2" />
            Despublicar
          </>
        ) : (
          <>
            <Eye className="h-4 w-4 mr-2" />
            Publicar
          </>
        )}
      </Button>

      <Button size="lg" variant="destructive" onClick={onDelete}>
        <Trash2 className="h-4 w-4 mr-2" />
        Eliminar
      </Button>
    </div>
  );
}
