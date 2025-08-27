import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, CheckCircle } from 'lucide-react';

interface CourseStudentActionsProps {
  isEnrolled: boolean;
  courseId: string;
  courseSlug: string;
  onEnroll: () => void;
}

export function CourseStudentActions({
  isEnrolled,
  courseSlug,
  onEnroll,
}: CourseStudentActionsProps) {
  if (isEnrolled) {
    return (
      <Button size="lg" asChild>
        <Link to={`/learn/${courseSlug}`}>
          <Play className="h-4 w-4 mr-2" />
          Continuar aprendiendo
        </Link>
      </Button>
    );
  }

  return (
    <Button size="lg" onClick={onEnroll}>
      <CheckCircle className="h-4 w-4 mr-2" />
      Inscribirme ahora
    </Button>
  );
}
