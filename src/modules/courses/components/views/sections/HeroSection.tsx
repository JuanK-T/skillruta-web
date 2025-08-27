import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUserStats } from '@/hooks/useUserStats';
import { Skeleton } from '@/components/ui/skeleton';

type Props = { publishedCount: number };

export default function HeroSection({ publishedCount }: Props) {
  const { isAuthenticated, user } = useAuth();
  const { stats, loading: statsLoading } = useUserStats();

  const scrollToCourses = () => {
    const cursosSection = document.getElementById('cursos');
    if (cursosSection) {
      cursosSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Renderizar skeletons mientras cargan las estadísticas
  if (isAuthenticated && statsLoading) {
    return (
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-12 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {isAuthenticated ? (
              user?.role === 'ADMIN' ? (
                <>
                  Panel de <span className="text-primary">Administración</span>
                </>
              ) : (
                <>
                  Hola,{' '}
                  <span className="text-primary">{user?.name?.split(' ')[0] || 'Instructor'}</span>
                </>
              )
            ) : (
              <>
                Transforma tu carrera con <span className="text-primary">SkillRuta</span>
              </>
            )}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isAuthenticated
              ? user?.role === 'ADMIN'
                ? 'Gestiona la plataforma y supervisa el rendimiento general.'
                : 'Monitorea el progreso de tus cursos y conecta con tus estudiantes.'
              : 'Aprende las habilidades más demandadas del mercado con cursos diseñados por expertos del Centro de Excelencia'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isAuthenticated ? (
              user?.role === 'ADMIN' ? (
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/admin/dashboard">Panel Admin</Link>
                </Button>
              ) : (
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/instructor/dashboard">Mi Dashboard</Link>
                </Button>
              )
            ) : (
              <>
                <Button size="lg" className="text-lg px-8" onClick={scrollToCourses}>
                  Explorar Cursos
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Ver Demo Gratuita
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {isAuthenticated ? (
              // Estadísticas para usuarios autenticados
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {stats?.totalCoursesCreated || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Cursos Creados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{stats?.totalStudents || 0}</div>
                  <div className="text-sm text-muted-foreground">Estudiantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {stats?.totalEnrollments || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Inscripciones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {stats?.averageCompletionRate || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Completación</div>
                </div>
              </>
            ) : (
              // Estadísticas para usuarios no autenticados
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{publishedCount}+</div>
                  <div className="text-sm text-muted-foreground">Cursos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Práctico</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Disponible</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">CoE</div>
                  <div className="text-sm text-muted-foreground">Expertos</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
