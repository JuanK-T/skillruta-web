import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type Props = { publishedCount: number };

export default function HeroSection({ publishedCount }: Props) {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transforma tu carrera con <span className="text-primary">SkillRuta</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Aprende las habilidades más demandadas del mercado con cursos diseñados por expertos del
            Centro de Excelencia
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="#cursos">Explorar Cursos</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Ver Demo Gratuita
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
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
          </div>
        </div>
      </div>
    </section>
  );
}
