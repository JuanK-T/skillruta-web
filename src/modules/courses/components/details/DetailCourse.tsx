import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Lock, Play } from 'lucide-react';
import { useCourse } from '../../hooks/useCourse';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategoryStyle, formatCategoryText } from '../../utils/categoryColors';

export default function CoursePublicPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { course, loading, error } = useCourse(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <div className="container py-8">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-video rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-32 mb-3" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {error ? 'Error al cargar el curso' : 'Curso no encontrado'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || 'El curso que buscas no existe o ha sido movido.'}
          </p>
          <Button asChild>
            <Link to="/">← Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

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

  const totalDuration = course.chapters.reduce((total, chapter) => total + chapter.durationSec, 0);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container py-8">
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
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

            {/* Acciones */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="flex-1 min-w-[200px]">
                  Inscribirme ahora
                </Button>
                {!user && (
                  <Button variant="outline" size="lg" className="flex-1 min-w-[200px]" asChild>
                    <Link to="/login">Iniciar sesión</Link>
                  </Button>
                )}
              </div>

              {!user && (
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
              )}
            </div>
          </div>
        </div>

        {/* Descripción detallada */}
        {course.objectives && course.objectives.length > 0 && (
          <div className="mt-12 bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Lo que aprenderás</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {course.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Programa del curso */}
        <div className="mt-8 bg-card rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Programa del curso ({course.chapters.length} capítulos)
          </h2>

          <div className="space-y-3">
            {course.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  user && chapter.isPublished
                    ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer'
                    : 'border-muted bg-muted/50'
                } transition-colors`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    user && chapter.isPublished
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>{formatDuration(chapter.durationSec)}</span>
                    {chapter.resources && chapter.resources.length > 0 && (
                      <span>{chapter.resources.length} recursos</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!user && <Lock className="h-4 w-4 text-muted-foreground" />}
                  {user && chapter.isPublished && <Play className="h-4 w-4 text-green-600" />}
                  {user && !chapter.isPublished && (
                    <span className="text-xs text-muted-foreground">Próximamente</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold mb-2">Duración flexible</h3>
            <p className="text-sm text-muted-foreground">Aprende a tu propio ritmo</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold mb-2">Proyectos prácticos</h3>
            <p className="text-sm text-muted-foreground">Aplica lo aprendido</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold mb-2">Certificado</h3>
            <p className="text-sm text-muted-foreground">Al completar el curso</p>
          </div>
        </div>
      </div>
    </div>
  );
}
