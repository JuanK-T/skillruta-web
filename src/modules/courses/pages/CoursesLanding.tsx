import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '@/modules/courses/data/mockCourses';
import CourseCard from '@/modules/courses/components/CourseCard';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, CheckCircle } from 'lucide-react';

export default function CoursesLanding() {
  const published = useMemo(() => mockCourses.filter((c) => c.isPublished), []);

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Contenido Actualizado',
      description: 'Cursos creados por expertos del CoE con las últimas tecnologías',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Comunidad Activa',
      description: 'Conecta con otros desarrolladores y mentores especializados',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Certificación',
      description: 'Obtén certificados reconocidos al completar tus cursos',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Transforma tu carrera con
              <span className="text-primary"> SkillRuta</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aprende las habilidades más demandadas del mercado con cursos diseñados por expertos
              del Centro de Excelencia
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="#cursos">Explorar Cursos</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Ver Demo Gratuita
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{published.length}+</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir SkillRuta?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de aprendizaje con herramientas modernas y contenido de
              calidad del CoE
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="cursos" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Cursos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestros cursos diseñados por expertos y comienza tu transformación
              profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {published.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Empty state */}
          {published.length === 0 && (
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
    </div>
  );
}
