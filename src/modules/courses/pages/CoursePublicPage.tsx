import { useParams, Link } from 'react-router-dom';
import { mockCourses } from '@/modules/courses/data/mockCourses';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Lock } from 'lucide-react';

export default function CoursePublicPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const course = mockCourses.find((c) => c.slug === slug);

  if (!course)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Curso no encontrado</h2>
          <p className="text-muted-foreground mb-6">
            El curso que buscas no existe o ha sido movido.
          </p>
          <Button asChild>
            <Link to="/">← Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  };

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
              <Badge variant="secondary" className="mb-3">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                Curso especializado diseñado por expertos del Centro de Excelencia de Desarrollo.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Por {course.authorName}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(course.totalDurationSec || 0)}
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

        {/* Programa del curso */}
        <div className="mt-16 bg-card rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Programa del curso</h2>

          <div className="space-y-4">
            {[
              'Introducción',
              'Fundamentos',
              'Proyecto práctico',
              'Evaluación',
              'Certificación',
            ].map((chapter, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  user ? 'border-green-200 bg-green-50' : 'border-muted bg-muted/50'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    user ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{chapter}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user ? 'Disponible' : 'Bloqueado - Requiere inicio de sesión'}
                  </p>
                </div>
                {!user && <Lock className="h-4 w-4 text-muted-foreground" />}
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
