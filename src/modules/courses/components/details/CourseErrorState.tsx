import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CourseErrorStateProps {
  error?: string;
}

export function CourseErrorState({ error }: CourseErrorStateProps) {
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
