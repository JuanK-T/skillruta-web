import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { CourseOwnerActions } from './CourseOwnerActions';
import { CourseStudentActions } from './CourseStudentActions';
import { useAuth } from '@/hooks/useAuth';
import { CourseDetail } from '@/modules/courses/types';

interface CourseActionsProps {
  course: CourseDetail;
  onEnroll?: () => void;
  onPublishToggle?: () => void;
  onDelete?: () => void;
}

export function CourseActions({
  course,
  onEnroll = () => {},
  onPublishToggle = () => {},
  onDelete = () => {},
}: CourseActionsProps) {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Si el usuario es el dueño del curso
  if (course.isOwner) {
    return (
      <div className="space-y-4">
        <CourseOwnerActions
          courseId={course.id}
          courseSlug={course.slug}
          isPublished={course.isPublished}
          onPublishToggle={onPublishToggle}
          onDelete={onDelete}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start">
            <div className="text-blue-600 mr-3 text-lg">👑</div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Modo instructor</h4>
              <p className="text-blue-700 text-sm">
                Eres el creador de este curso. Puedes editarlo, ver estadísticas y gestionar su
                publicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado pero NO es el dueño
  if (isAuthenticated) {
    return (
      <div className="space-y-4">
        <CourseStudentActions
          isEnrolled={course.isEnrolled || false}
          courseId={course.id}
          courseSlug={course.slug}
          onEnroll={onEnroll}
        />

        {!course.isEnrolled && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start">
              <div className="text-green-600 mr-3 text-lg">🎯</div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">¡Comienza tu aprendizaje!</h4>
                <p className="text-green-700 text-sm">
                  Inscríbete en este curso para acceder a todos los capítulos, materiales y
                  certificado.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Si el usuario NO está autenticado
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button size="lg" className="flex-1 min-w-[200px]" asChild>
          <Link to="/login">Inscribirme ahora</Link>
        </Button>
        <Button variant="outline" size="lg" className="flex-1 min-w-[200px]" asChild>
          <Link to="/login">Iniciar sesión</Link>
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start">
          <Lock className="text-amber-600 mr-3 h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Contenido bloqueado</h4>
            <p className="text-amber-700 text-sm">
              Inicia sesión para desbloquear todos los capítulos y materiales del curso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
